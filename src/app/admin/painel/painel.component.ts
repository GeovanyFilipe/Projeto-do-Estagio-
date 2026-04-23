import { Component, OnInit, inject, NgZone, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../../services/auth.service';
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { listUserDevices, getUserSubscription, listUserInvoices, listUserSessions, listConnectionLogs } from '@dataconnect/generated';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';



@Component({
  selector: 'app-painel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private ngZone = inject(NgZone);

  currentUser: User | null = null;
  devices: any[] = [];
  currentSubscription: any = null;
  invoices: any[] = [];
  sessions: any[] = [];
  connections: any[] = [];
  
  private destroy$ = new Subject<void>();



  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.currentUser = user;
        if (user) {
          this.loadAdminData(user.id);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private async loadAdminData(userId: string): Promise<void> {
    try {
      const results = await new Promise<any>((resolve, reject) => {
        this.ngZone.runOutsideAngular(async () => {
          try {
            const dc = getDataConnect(connectorConfig);

            // Executar todas as consultas em paralelo de forma pura
            const [devicesRes, subRes, invoicesRes, sessionsRes, connectionsRes] = await Promise.all([
              listUserDevices(dc, { userId }),
              getUserSubscription(dc, { userId }),
              listUserInvoices(dc, { userId }),
              listUserSessions(dc, { userId }),
              listConnectionLogs(dc, { userId })
            ]);

            resolve({
              devices: devicesRes.data.devices,
              subscription: subRes.data.userSubscriptions[0] || null,
              invoices: invoicesRes.data.invoices,
              sessions: sessionsRes.data.userSessions,
              connections: connectionsRes.data.connectionLogs
            });
          } catch (e) { reject(e); }
        });
      });

      // Atualizar o estado do componente (dentro do zone para refletir na UI)
      this.devices = results.devices;
      this.currentSubscription = results.subscription;
      this.invoices = results.invoices;
      this.sessions = results.sessions;
      this.connections = results.connections;

    } catch (err: any) {
      const errorMsg = err?.message ? String(err.message) : String(err);
      console.error('Erro ao carregar dados do painel do Firebase:', errorMsg);
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


