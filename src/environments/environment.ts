export const environment = {
  production: false,
  api: {
    ekwanzaUrl: 'https://api.eplus.ao/v1', // Substituir pela URL real da e+
    ekwanzaToken: '', // Token deve ser injetado via .env em produção
    retryCount: 3
  }
};
