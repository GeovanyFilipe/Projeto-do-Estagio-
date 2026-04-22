const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

admin.initializeApp();

// Inicializa o Stripe usando a chave das variáveis de ambiente
// Comando para configurar: firebase functions:config:set stripe.secret_key="SUA_CHAVE_AQUI"
const stripe = require("stripe")(functions.config().stripe ? functions.config().stripe.secret_key : "sk_test_placeholder");

/**
 * Cloud Function para processar pagamentos seguros com Stripe.
 * Requisitos: Header 'Authorization: Bearer <ID_TOKEN>'
 */
exports.createPayment = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    // 1. Validar método da requisição
    if (req.method !== "POST") {
      return res.status(405).send({ error: "Método não permitido. Use POST." });
    }

    // 2. Extrair e validar o Token JWT (Bearer Token)
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      console.error("Token de autorização ausente ou malformado.");
      return res.status(401).send({ error: "Não autorizado. Token ausente." });
    }

    const idToken = authorization.split("Bearer ")[1];
    let decodedToken;

    try {
      decodedToken = await admin.auth().verifyIdToken(idToken);
    } catch (error) {
      console.error("Erro ao validar token:", error.message);
      return res.status(401).send({ error: "Token inválido ou expirado." });
    }

    const userId = decodedToken.uid;
    const { paymentMethodId, amount, planName } = req.body;

    // 3. Validação rigorosa dos campos de entrada
    if (!paymentMethodId || !amount || isNaN(amount)) {
      return res.status(400).send({ error: "Campos 'paymentMethodId' e 'amount' (numérico) são obrigatórios." });
    }

    try {
      // 4. Criar o PaymentIntent no Stripe
      // O valor deve ser em centavos (ex: 6000 Kz -> 6000)
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount), 
        currency: "aoa", // Kwanza Angolano (Verificar suporte do Stripe para AOA ou usar USD/EUR se necessário)
        payment_method: paymentMethodId,
        confirmation_method: "manual",
        confirm: true,
        description: `Pagamento de Plano: ${planName || "VPN Individual"}`,
        metadata: { userId: userId }
      });

      // 5. Salvar log da ordem no Firestore
      const orderData = {
        userId: userId,
        amount: amount,
        currency: "AOA",
        planName: planName || "VPN Individual",
        status: paymentIntent.status === "succeeded" ? "completo" : "pendente",
        paymentIntentId: paymentIntent.id,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        paymentMethod: "Stripe"
      };

      const orderRef = await admin.firestore().collection("orders").add(orderData);

      // 6. Retornar resposta de sucesso
      return res.status(200).send({
        success: true,
        orderId: orderRef.id,
        status: paymentIntent.status,
        clientSecret: paymentIntent.client_secret
      });

    } catch (error) {
      console.error("Erro no processamento do Stripe/Firestore:", error.message);
      return res.status(500).send({ 
        error: "Falha ao processar pagamento.", 
        details: error.message 
      });
    }
  });
});
