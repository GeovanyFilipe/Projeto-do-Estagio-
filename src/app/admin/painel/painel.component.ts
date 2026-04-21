import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../../services/auth.service';
import { DataConnect } from 'firebase/data-connect';
import { listUserDevices, getUserSubscription, listUserInvoices, listUserSessions, listConnectionLogs } from '@dataconnect/generated';
import { Router } from '@angular/router';



@Component({
  selector: 'app-painel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {
  private authService = inject(AuthService);
  private dataconnect = inject(DataConnect);
  private router = inject(Router);

  currentUser: User | null = null;
  devices: any[] = [];
  currentSubscription: any = null;
  invoices: any[] = [];
  sessions: any[] = [];
  connections: any[] = [];



  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.loadAdminData(user.id);
      }
    });
  }

  private async loadAdminData(userId: string): Promise<void> {
    try {
      // Carregar dispositivos
      const devicesRes = await listUserDevices(this.dataconnect, { userId });
      this.devices = devicesRes.data.devices;

      // Carregar assinatura
      const subRes = await getUserSubscription(this.dataconnect, { userId });
      this.currentSubscription = subRes.data.userSubscriptions[0] || null;

      // Carregar faturas
      const invoicesRes = await listUserInvoices(this.dataconnect, { userId });
      this.invoices = invoicesRes.data.invoices;

      // Carregar sessões
      const sessionsRes = await listUserSessions(this.dataconnect, { userId });
      this.sessions = sessionsRes.data.userSessions;

      // Carregar histórico de conexões VPN
      const connectionsRes = await listConnectionLogs(this.dataconnect, { userId });
      this.connections = connectionsRes.data.connectionLogs;
    } catch (err) {
      console.error('Erro ao carregar dados do painel do PGLite:', err);
    }
  }



  gerenciarPlano() {
    this.router.navigate(['/planos']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  gerenciarDispositivos() {
    this.router.navigate(['/cliente/dashboard']);
  }

  // Getters para UI dinâmica
  get daysRemaining(): number {
    if (!this.currentSubscription?.endDate) return 0;
    const end = new Date(this.currentSubscription.endDate).getTime();
    const now = new Date().getTime();
    const diff = end - now;
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }

  get subscriptionProgress(): number {
    if (!this.currentSubscription?.startDate || !this.currentSubscription?.endDate) return 0;
    const start = new Date(this.currentSubscription.startDate).getTime();
    const end = new Date(this.currentSubscription.endDate).getTime();
    const now = new Date().getTime();

    if (now >= end) return 100;
    if (now <= start) return 0;

    const total = end - start;
    const consumed = now - start;
    return Math.min(100, Math.round((consumed / total) * 100));
  }

  get statusLevel(): 'success' | 'warning' | 'danger' {
    const days = this.daysRemaining;
    if (days > 7) return 'success';
    if (days > 2) return 'warning';
    return 'danger';
  }
}


