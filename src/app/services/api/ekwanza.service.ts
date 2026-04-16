import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environment';

export interface EKwanzaPaymentRequest {
  valor: number;
  descricao: string;
  referencia?: string;
  contato_cliente: string;
}

export interface EKwanzaPaymentResponse {
  transacao_id: string;
  status: 'PENDENTE' | 'SUCESSO' | 'FALHOU';
  checkout_url?: string;
  qrcode?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EKwanzaService {
  private api = inject(ApiService);
  private readonly baseUrl = environment.api.ekwanzaUrl;

  /**
   * Inicia um processo de pagamento via eKwanza
   */
  async criarPagamento(dados: EKwanzaPaymentRequest): Promise<EKwanzaPaymentResponse> {
    try {
      // Exemplo de endpoint: /checkout/init
      return await this.api.post<EKwanzaPaymentResponse>(
        `${this.baseUrl}/payments/create`,
        dados,
        { authenticate: true }
      );
    } catch (error) {
      // Erro já logado pelo ApiService, aqui tratamos lógica de negócio se necessário
      throw error;
    }
  }

  /**
   * Consulta o status de uma transação específica
   */
  async consultarStatus(transacaoId: string): Promise<EKwanzaPaymentResponse> {
    return this.api.get<EKwanzaPaymentResponse>(
      `${this.baseUrl}/payments/status/${transacaoId}`
    );
  }

  /**
   * Lista histórico de pagamentos (Exemplo de GET com Query Params)
   */
  async listarHistorico(limit: number = 10): Promise<EKwanzaPaymentResponse[]> {
    return this.api.get<EKwanzaPaymentResponse[]>(
      `${this.baseUrl}/payments/history`,
      { params: { limit } }
    );
  }

  /**
   * Mock para fins de teste/demonstração enquanto a API real não é utilizada
   */
  async mockPagamentoDemo(): Promise<any> {
    console.log('[EKwanzaService] Iniciando pagamento MOCK...');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Instância de integração pronta para a API real.',
          gateway: 'eKwanza (e+)'
        });
      }, 500);
    });
  }
}
