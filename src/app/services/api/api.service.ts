import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, firstValueFrom, retry, throwError, timer } from 'rxjs';
import { ApiError, ApiResponse, RequestOptions } from './api.types';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);

  /**
   * Realiza uma requisição GET
   */
  async get<T>(url: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>('GET', url, null, options);
  }

  /**
   * Realiza uma requisição POST
   */
  async post<T>(url: string, body: any, options: RequestOptions = {}): Promise<T> {
    return this.request<T>('POST', url, body, options);
  }

  /**
   * Realiza uma requisição PUT
   */
  async put<T>(url: string, body: any, options: RequestOptions = {}): Promise<T> {
    return this.request<T>('PUT', url, body, options);
  }

  /**
   * Realiza uma requisição DELETE
   */
  async delete<T>(url: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>('DELETE', url, null, options);
  }

  /**
   * Método core para processar requisições com suporte a async/await, retries e erro handling
   */
  private async request<T>(
    method: string,
    url: string,
    body: any = null,
    options: RequestOptions = {}
  ): Promise<T> {
    const retryCount = options.retryCount ?? environment.api.retryCount;
    const headers = this.createHeaders(options);

    const observable$ = this.http.request<T>(method, url, {
      body,
      headers,
      params: options.params,
      reportProgress: options.reportProgress,
      withCredentials: options.withCredentials,
      responseType: options.responseType
    }).pipe(
      // Lógica de Retry: Tenta novamente em caso de erros de rede (status 0 ou >= 500)
      retry({
        count: retryCount,
        delay: (error, count) => {
          console.warn(`[ApiService] Tentativa ${count} de ${retryCount} para ${url}`);
          return timer(count * 1000); // Backoff simples
        }
      }),
      // Tratamento de Erros
      catchError((error: HttpErrorResponse) => {
        const apiError = this.formatError(error);
        this.logError(apiError, url, method);
        return throwError(() => apiError);
      })
    );

    try {
      return await firstValueFrom(observable$);
    } catch (err) {
      throw err;
    }
  }

  /**
   * Cria os headers da requisição, injetando token se necessário
   */
  private createHeaders(options: RequestOptions): HttpHeaders {
    let headers = new HttpHeaders(options.headers as any || {});

    if (options.authenticate !== false) {
      const token = localStorage.getItem('token');
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }

    // Default Content-Type
    if (!headers.has('Content-Type')) {
      headers = headers.set('Content-Type', 'application/json');
    }

    return headers;
  }

  /**
   * Formata o erro HTTP para um padrão amigável
   */
  private formatError(error: HttpErrorResponse): ApiError {
    return {
      status: error.status,
      message: error.error?.message || error.message || 'Erro inesperado na comunicação com a API',
      error: error.error,
      timestamp: new Date().toISOString(),
      path: error.url || undefined
    };
  }

  /**
   * Logs claros para debug e manutenção
   */
  private logError(error: ApiError, url: string, method: string): void {
    console.group(`[API ERROR] ${method} ${url}`);
    console.error(`Status: ${error.status}`);
    console.error(`Mensagem: ${error.message}`);
    console.error(`Timestamp: ${error.timestamp}`);
    console.dir(error.error);
    console.groupEnd();
  }
}
