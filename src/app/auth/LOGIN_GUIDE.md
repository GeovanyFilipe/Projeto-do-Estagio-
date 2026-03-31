# 🔐 Guia de Autenticação e Área do Cliente

## 📋 Tela de Login

### Acesso
- URL: `/login`
- Acessível por: Botão "Entrar" na navbar (quando não autenticado)

### Funcionalidades

#### 1. **Login**
- Email e senha
- Persistência local (localStorage)
- Redirecionamento automático para dashboard

#### 2. **Cadastro**
- Nome completo
- Email
- Senha (mínimo 6 caracteres)
- Seleção de plano (YouTube ou .GOV.AO)

#### 3. **Validações**
- Email obrigatório
- Senha com mínimo 6 caracteres
- Todos os campos requeridos no cadastro
- Mensagens de erro claras

---

## 👤 Área do Cliente (Dashboard)

### Localização
- URL: `/cliente/dashboard`
- Protegida por: `AuthGuard` - só acesso autenticado

### Estrutura

#### **Sidebar de Navegação**
1. 📊 Visão Geral (padrão)
2. 🎯 Meu Plano
3. 📱 Dispositivos
4. 💳 Faturamento
5. 💬 Suporte
6. 🚪 Sair

#### **Aba 1: Visão Geral**
- Status da assinatura (ativo/inativo)
- Plano atual
- Data de cadastro
- Próximo pagamento
- Uso de largura de banda (barra visual)
- Dispositivos conectados (máx 5)
- Acesso rápido a suporte

#### **Aba 2: Meu Plano**
Dois planos disponíveis:

| Plano | Preço | Benefícios |
|-------|-------|-----------|
| YouTube sem Anúncios | AOA 5.99/mês | Download de vídeos, 1080p, Suporte 24/7 |
| .GOV.AO | AOA 9.99/mês | Acesso plataforma governo, Encriptação, Prioridade, Multi-device |

- Mudar de plano com confirmação
- Badge "Plano Atual" para o plano ativo
- Botão desabilitado para plano atual

#### **Aba 3: Dispositivos**
Tabela com:
- Nome do dispositivo
- Status (Ativo/Inativo)
- IP do dispositivo
- Último acesso
- Botão para desconectar

Exemplo de dados fictícios:
```
Notebook - Chrome       | Ativo    | 192.168.1.100 | 2 min atrás
Celular - Android       | Ativo    | 192.168.1.101 | 15 min atrás
Tablet - iPad           | Inativo  | 192.168.1.102 | 2 dias atrás
```

#### **Aba 4: Faturamento**
Histórico de faturas com:
- Data de pagamento
- Valor cobrado
- Status (Pago)
- Método de pagamento
- Botão para baixar fatura

#### **Aba 5: Suporte**
- 4 Cards de suporte:
  - 💬 Chat (tempo real)
  - 📧 Email
  - 📱 Suporte Técnico
  - 🛍️ Suporte Comercial
- Seção de FAQ com 3 perguntas frequentes

---

## 🔐 Sistema de Autenticação

### Serviço: `AuthService`

#### Métodos Principais

```typescript
login(email: string, password: string): Observable<LoginResponse>
register(email: string, password: string, nome: string, plano: string): Observable<LoginResponse>
logout(): void
getToken(): string | null
getCurrentUser(): User | null
isAuthenticated(): boolean
updatePlano(novoPlano: string): void
```

#### Observable Público

```typescript
currentUser$: Observable<User>     // Usuário atual
isAuthenticated$: Observable<boolean>  // Status de autenticação
```

### Guard: `AuthGuard`

- Protege rotas que requerem autenticação
- Redireciona para `/login` se não autenticado
- Salva URL de retorno em `queryParams`

---

## 💾 Armazenamento de Dados

### LocalStorage
```javascript
localStorage.setItem('token', token)           // Token de sessão
localStorage.setItem('currentUser', userJSON)  // Dados do usuário
```

### Dados do Usuário (User)
```typescript
{
  id: string           // ID único
  email: string        // Email
  nome: string         // Nome do usuário
  plano: string        // Plano atual
  dataCadastro: string // Data ISO de cadastro
  ativo: boolean       // Status da conta
}
```

---

## 🎨 Design e UX

### Cores
- Primária: `#1e3a5f` (azul escuro)
- Secundária: `#2d5a8c` (azul médio)
- Destaque: `#00d4ff` (cyan)
- Accent: `#0099ff` (azul claro)

### Animações
- Fade-in/fade-out: 0.3s
- Slide-up: 0.5s
- Transições suaves: cubic-bezier(0.4, 0, 0.2, 1)

### Responsividade
- Desktop: Layout completo com sidebar
- Tablet: Sidebar colapsável
- Mobile: Menu mobile com overlay

---

## 🔄 Fluxo de Autenticação

```
┌─────────────────┐
│   Página Login  │
└────────┬────────┘
         │
         ├─► Cadastro
         │    ├─── Nome
         │    ├─── Email
         │    ├─── Senha
         │    └─── Plano
         │
         └─► Login
              ├─── Email
              └─── Senha
                   │
                   ├─► Sucesso
                   │    ├─── Salvar token
                   │    ├─── Salvar user
                   │    └─► Dashboard
                   │
                   └─► Erro
                        └─── Mostrar mensagem
```

---

## 📱 Integração na Navbar

### Não Autenticado
```
[Logo]  [Menu...]  [Entrar]  [Experimente Grátis]
```

### Autenticado
```
[Logo]  [Menu...]  [Avatar + Nome + Plano]  [Meu Painel]  [Sair]
```

### Mobile
- Avatar incluso no perfil colapsável
- Botões empilhados verticalmente
- Menu hamburger responsivo

---

## 🚀 Próximos Passos

### Melhorias Futuras
1. **Backend Real**
   - Integrar com API REST
   - Validações no servidor
   - JWT para autenticação

2. **Segurança**
   - HTTPS obrigatório
   - Refresh tokens
   - Proteção contra CSRF

3. **Funcionalidades**
   - 2FA (Autenticação de dois fatores)
   - Recuperação de senha
   - Social login (Google, Facebook)
   - Histórico de atividades

4. **Notificações**
   - Email de confirmação
   - Alertas de novo dispositivo
   - Lembretes de pagamento

---

## 📝 Dados de Teste

### Credenciais Válidas
- **Email**: qualquer email válido
- **Senha**: mínimo 6 caracteres

### Exemplo
```
Email: joao@example.com
Senha: 123456
```

---

## ⚠️ Notas Importantes

1. **Dados Simulados**: Atualmente tudo é simulado em localStorage
2. **Sem Persistência Real**: Dados são perdidos ao limpar localStorage
3. **Sem Backend**: Não há integração com servidor
4. **Sem Validação Email**: Email não precisa existir realmente

---

## 🔗 Recursos Relacionados

- [Guia de Implementação](GUIA_IMPLEMENTACAO.md)
- [Documentação Técnica](DOCUMENTACAO_TECNICA.md)
- [Reformulação Completa](REFORMULACAO.md)

---

**Versão**: 1.0  
**Última atualização**: 31/03/2026  
**Status**: Completo e Funcional ✅
