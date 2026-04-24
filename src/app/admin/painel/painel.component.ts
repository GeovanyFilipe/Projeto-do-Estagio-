import { Component, OnInit, inject, NgZone, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, AppUser } from '../../services/auth.service';
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

  currentUser: AppUser | null = null;
  devices: any[] = [];
  currentSubscription: any = null;
  invoices: any[] = [];
  sessions: any[] = [];
  connections: any[] = [];
  
  private destroy$ = new Subject<void>();



  ngOnInit(): void {
    this.authService.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        if (!user) {
          this.router.navigate(['/login']);
          return;
        }
        this.currentUser = user as any;
        this.loadAdminData(user.uid);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private async loadAdminData(userId: string): Promise<void> {
    try {
      const [devicesRes, subRes, invoicesRes, sessionsRes, connectionsRes] = await Promise.all([
        listUserDevices({ userId }),
        getUserSubscription({ userId }),
        listUserInvoices({ userId }),
        listUserSessions({ userId }),
        listConnectionLogs({ userId })
      ]);

      this.devices = devicesRes.data.devices;
      this.currentSubscription = subRes.data.userSubscriptions[0] || null;
      this.invoices = invoicesRes.data.invoices;
      this.sessions = sessionsRes.data.userSessions;
      this.connections = connectionsRes.data.connectionLogs;

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


