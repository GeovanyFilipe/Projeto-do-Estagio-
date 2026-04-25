// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  created_at: string;
}

export interface Node {
  id: number;
  name: string;
  hostname: string;
  ip_addresses: string[];
  last_seen: string;
  online: boolean;
  expiry: string;
}

export interface PreAuthKey {
  id: number;
  key: string;
  expiration: string;
  created_at: string;
  reusable: boolean;
  used: boolean;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = 'https://api.angolanvpn.com'; // Ajustar para o domínio real

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Autenticação
  login(email: string): Observable<{ token: string; user: User }> {
    return this.http.post<{ token: string; user: User }>(`${this.apiUrl}/auth/login`, { email });
  }

  // Utilizador atual
  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/api/user`, { headers: this.getHeaders() });
  }

  // Dispositivos do utilizador
  getUserNodes(): Observable<Node[]> {
    return this.http.get<Node[]>(`${this.apiUrl}/api/nodes`, { headers: this.getHeaders() });
  }

  // Chaves do utilizador
  getUserKeys(): Observable<PreAuthKey[]> {
    return this.http.get<PreAuthKey[]>(`${this.apiUrl}/api/keys`, { headers: this.getHeaders() });
  }

  // Criar nova chave
  createKey(expiryHours: number = 720, reusable: boolean = false): Observable<{ key: string }> {
    return this.http.post<{ key: string }>(
      `${this.apiUrl}/api/keys`,
      { expiry_hours: expiryHours, reusable },
      { headers: this.getHeaders() }
    );
  }

  // Revogar chave
  revokeKey(keyId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/keys/${keyId}`, { headers: this.getHeaders() });
  }

  // Estatísticas
  getUserStats(): Observable<{
    active_nodes: number;
    total_nodes: number;
    active_keys: number;
    total_keys: number;
    traffic: { rx: number; tx: number };
  }> {
    return this.http.get<any>(`${this.apiUrl}/api/stats`, { headers: this.getHeaders() });
  }
}