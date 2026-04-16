import { HttpHeaders, HttpParams } from '@angular/common/http';

/**
 * Interface genérica para resposta de API
 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
  success: boolean;
}

/**
 * Interface para erros de API
 */
export interface ApiError {
  error: any;
  message: string;
  status: number;
  timestamp: string;
  path?: string;
}

/**
 * Opções de requisição HTTP
 */
export interface RequestOptions {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  params?: HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> };
  reportProgress?: boolean;
  withCredentials?: boolean;
  responseType?: 'json';
  authenticate?: boolean; // Se deve incluir token de autenticação
  retryCount?: number;    // Número de tentativas em caso de falha
}
