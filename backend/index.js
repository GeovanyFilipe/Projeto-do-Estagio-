// backend/index.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const session = require('express-session');

const app = express();

// Configurações
const HEADSCALE_URL = 'https://vpn.angolanvpn.com';
const HEADSCALE_API_KEY = process.env.HEADSCALE_API_KEY;
const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret';
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = 'https://api.angolanvpn.com/auth/callback';

app.use(cors({
  origin: 'https://painel.angolanvpn.com',
  credentials: true
}));
app.use(express.json());
app.use(session({
  secret: 'session-secret',
  resave: false,
  saveUninitialized: false
}));

// Helper para chamar Headscale API
async function headscaleRequest(method, endpoint, data = null) {
  try {
    const config = {
      method,
      url: `${HEADSCALE_URL}/api/v1/${endpoint}`,
      headers: { 'Authorization': `Bearer ${HEADSCALE_API_KEY}` }
    };
    if (data) config.data = data;
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error('Headscale API error:', error.response?.data || error.message);
    throw error;
  }
}

// ============ ROTA DE LOGIN (inicia OIDC) ============
app.get('/auth/login', (req, res) => {
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${CLIENT_ID}&` +
    `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&` +
    `response_type=code&` +
    `scope=openid%20email%20profile&` +
    `access_type=offline`;
  
  res.redirect(googleAuthUrl);
});

// ============ CALLBACK OIDC ============
app.get('/auth/callback', async (req, res) => {
  const { code } = req.query;
  
  if (!code) {
    return res.status(400).send('Missing authorization code');
  }
  
  try {
    // Trocar code por tokens
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code'
    });
    
    const { id_token, access_token } = tokenResponse.data;
    
    // Decodificar id_token para obter email
    const payload = jwt.decode(id_token);
    const email = payload.email;
    const name = payload.name;
    const picture = payload.picture;
    
    // Verificar email permitido
    const allowedDomains = ['gmail.com', 'angolanvpn.com', 'gov.ao'];
    const domain = email.split('@')[1];
    
    if (!allowedDomains.includes(domain)) {
      return res.status(403).send('Domínio não autorizado');
    }
    
    // Validar/Criar utilizador no Headscale
    let users = await headscaleRequest('GET', 'user');
    let headscaleUser = users.find(u => u.name === email);
    
    if (!headscaleUser) {
      // Criar utilizador no Headscale
      headscaleUser = await headscaleRequest('POST', 'user', { name: email });
    }
    
    // Gerar JWT para o Angular
    const appToken = jwt.sign(
      { 
        id: headscaleUser.id,
        email,
        name,
        picture
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    // Guardar token na sessão ou enviar via query param
    // Redirecionar para o Angular com o token
    res.redirect(`https://painel.angolanvpn.com/auth/callback?token=${appToken}`);
    
  } catch (error) {
    console.error('OIDC callback error:', error);
    res.status(500).send('Authentication failed');
  }
});

// ============ VALIDAR TOKEN E OBTER DADOS DO UTILIZADOR ============
app.get('/api/me', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Obter dados atualizados do Headscale
    const users = await headscaleRequest('GET', 'user');
    const user = users.find(u => u.id === decoded.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({
      id: user.id,
      email: user.name,
      name: decoded.name,
      picture: decoded.picture,
      createdAt: user.created_at
    });
    
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// ============ LISTAR DISPOSITIVOS DO UTILIZADOR ============
app.get('/api/nodes', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const nodes = await headscaleRequest('GET', 'node');
    const userNodes = nodes.filter(node => node.user?.id === decoded.id);
    
    res.json(userNodes.map(node => ({
      id: node.id,
      name: node.name,
      hostname: node.hostname,
      ipAddresses: node.ip_addresses,
      lastSeen: node.last_seen,
      online: node.last_seen && new Date(node.last_seen) > new Date(Date.now() - 5 * 60 * 1000),
      expiry: node.expiry
    })));
    
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// ============ CRIAR PRE-AUTH KEY ============
app.post('/api/keys', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  const { expiryHours = 720, reusable = false } = req.body;
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    const key = await headscaleRequest('POST', 'preauthkey', {
      user: decoded.id,
      expiration: `${expiryHours}h`,
      reusable
    });
    
    res.json({ key: key.key });
    
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// ============ LISTAR CHAVES DO UTILIZADOR ============
app.get('/api/keys', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const keys = await headscaleRequest('GET', 'preauthkey');
    const userKeys = keys.filter(k => k.user === decoded.id);
    
    res.json(userKeys);
    
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

app.listen(3001, () => {
  console.log('API running on port 3001');
});