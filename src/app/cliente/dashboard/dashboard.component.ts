import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { MenuComponent } from '../../layout/menu/menu.component';
import { RodapeComponent } from '../../layout/rodape/rodape.component';
import { listUserDevices, getUserSubscription, deleteDevice, listUserInvoices, listUserSessions, listConnectionLogs, listSubscriptionTypes } from '@dataconnect/generated';
import { inject } from '@angular/core';
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';




@Component({
  selector: 'app-cliente-dashboard',
  standalone: true,
  imports: [CommonModule, MenuComponent, RodapeComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class ClienteDashboardComponent implements OnInit {
  currentUser: User | null = null;
  activeTab: string = 'overview';
  showLogoutConfirm: boolean = false;

  devices: any[] = [];
  currentSubscription: any = null;
  invoices: any[] = [];
  sessions: any[] = [];
  connections: any[] = [];
  availablePlans: any[] = [];




  get hasPlan(): boolean {
    return !!this.currentUser && this.currentUser.plano !== 'Nenhum plano' && this.currentUser.plano !== '';
  }

  get deviceLimit(): number {
    if (this.currentSubscription?.subscriptionType) {
      return this.currentSubscription.subscriptionType.maxDevices;
    }
    return 0;
  }





  constructor(
    private authService: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {
    // Verificar se está autenticado
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.loadDashboardData(user.id);
        this.loadAvailablePlans();
      }
    });
  }

  private async loadAvailablePlans(): Promise<void> {
    try {
      const dc = getDataConnect(connectorConfig);
      const res = await listSubscriptionTypes(dc);
      this.availablePlans = res.data.subscriptionTypes;
    } catch (err) {
      console.error('Erro ao carregar tipos de assinatura:', err);
    }
  }


  private async loadDashboardData(userId: string): Promise<void> {
    try {
      const dc = getDataConnect(connectorConfig);
      
      // Carregar dispositivos
      const devicesRes = await listUserDevices(dc, { userId });
      this.devices = devicesRes.data.devices;

      // Carregar assinatura
      const subRes = await getUserSubscription(dc, { userId });
      this.currentSubscription = subRes.data.userSubscriptions[0] || null;

      // Carregar faturas
      const invoicesRes = await listUserInvoices(dc, { userId });
      this.invoices = invoicesRes.data.invoices;

      // Carregar histórico de atividade
      const sessionsRes = await listUserSessions(dc, { userId });
      this.sessions = sessionsRes.data.userSessions;

      const connRes = await listConnectionLogs(dc, { userId });
      this.connections = connRes.data.connectionLogs;
    } catch (err: any) {
      const errorMsg = err?.message ? String(err.message) : String(err);
      console.error('Erro ao carregar dados do dashboard do Firebase:', errorMsg);
    }
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



  selectTab(tab: string): void {
    this.activeTab = tab;
  }

  async disconnectDevice(deviceId: string): Promise<void> {
    const confirmed = confirm('Tem certeza que deseja desconectar este dispositivo?');
    if (confirmed) {
      try {
        const dc = getDataConnect(connectorConfig);
        await deleteDevice(dc, { id: deviceId });
        this.devices = this.devices.filter(d => d.id !== deviceId);
      } catch (err) {
        alert('Erro ao desconectar dispositivo.');
      }
    }
  }


  downloadInvoice(invoiceId: number): void {
    alert(`Baixando fatura ${invoiceId}`);
    // Em produção, seria um download real
  }

  async changePlan(newPlan: string): Promise<void> {
    if (this.currentUser && this.currentUser.plano !== newPlan) {
      const confirmed = confirm(`Alterar para ${newPlan}?`);
      if (confirmed) {
        try {
          await this.authService.updatePlano(newPlan);
          alert('Plano alterado com sucesso!');
        } catch (error) {
          alert('Erro ao alterar o plano. Tente novamente.');
        }
      }
    }
  }

  contacterSuporte(): void {
    this.router.navigate(['/suporte/tecnico']);
  }

  confirmLogout(): void {
    this.showLogoutConfirm = true;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  cancelLogout(): void {
    this.showLogoutConfirm = false;
  }
}
