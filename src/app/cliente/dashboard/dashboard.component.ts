import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { MenuComponent } from '../../layout/menu/menu.component';
import { RodapeComponent } from '../../layout/rodape/rodape.component';
import { 
  listUserDevices, 
  getUserSubscription, 
  deleteDevice, 
  listUserInvoices, 
  listUserSessions, 
  listConnectionLogs, 
  listSubscriptionTypes 
} from '@dataconnect/generated';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cliente-dashboard',
  standalone: true,
  imports: [CommonModule, MenuComponent, RodapeComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class ClienteDashboardComponent implements OnInit, OnDestroy {
  currentUser: User | null = null;
  activeTab: string = 'overview';
  showLogoutConfirm: boolean = false;
  private authSub?: Subscription;

  // Dados do Dashboard
  devices: any[] = [];
  currentSubscription: any = null;
  invoices: any[] = [];
  sessions: any[] = [];
  connections: any[] = [];
  availablePlans: any[] = [];

  constructor(
    private authService: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    this.authSub = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.loadDashboardData(user.id);
        this.loadAvailablePlans();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.authSub) this.authSub.unsubscribe();
  }

  private async loadAvailablePlans(): Promise<void> {
    try {
      // Formato corrigido: Sem o objeto 'dc'
      const res = await listSubscriptionTypes();
      this.availablePlans = res.data.subscriptionTypes;
    } catch (err) {
      console.error('Erro ao carregar tipos de assinatura:', err);
    }
  }

  private async loadDashboardData(userId: string): Promise<void> {
    try {
      // Apenas strings simples são passadas agora
      const [devicesRes, subRes, invoicesRes, sessionsRes, connRes] = await Promise.all([
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
      this.connections = connRes.data.connectionLogs;
    } catch (err: any) {
      console.error('Erro ao carregar dados do dashboard:', err.message || err);
    }
  }

  // --- LOGICA UI ---
  get hasPlan(): boolean {
    return !!this.currentUser && this.currentUser.plano !== 'Nenhum plano' && this.currentUser.plano !== '';
  }

  get daysRemaining(): number {
    if (!this.currentSubscription?.endDate) return 0;
    const end = new Date(this.currentSubscription.endDate).getTime();
    const diff = end - Date.now();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }

  get subscriptionProgress(): number {
    if (!this.currentSubscription?.startDate || !this.currentSubscription?.endDate) return 0;
    const start = new Date(this.currentSubscription.startDate).getTime();
    const end = new Date(this.currentSubscription.endDate).getTime();
    const now = Date.now();

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

  async disconnectDevice(deviceId: string): Promise<void> {
    if (confirm('Deseja desconectar este dispositivo?')) {
      try {
        await deleteDevice({ id: deviceId });
        this.devices = this.devices.filter(d => d.id !== deviceId);
      } catch (err) {
        alert('Erro ao desconectar.');
      }
    }
  }

  async changePlan(newPlan: string): Promise<void> {
    if (this.currentUser && this.currentUser.plano !== newPlan) {
      if (confirm(`Alterar para ${newPlan}?`)) {
        try {
          await this.authService.updatePlano(newPlan);
          alert('Plano alterado com sucesso!');
        } catch (error) {
          alert('Erro ao alterar o plano.');
        }
      }
    }
  }

  logout(): void {
    this.authService.logout();
  }

  selectTab(tab: string): void { this.activeTab = tab; }
  confirmLogout(): void { this.showLogoutConfirm = true; }
  cancelLogout(): void { this.showLogoutConfirm = false; }
  contacterSuporte(): void { this.router.navigate(['/suporte/tecnico']); }
  downloadInvoice(id: number): void { alert(`Baixando fatura ${id}`); }
}