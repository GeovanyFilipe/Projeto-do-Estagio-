import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { MenuComponent } from '../../layout/menu/menu.component';
import { RodapeComponent } from '../../layout/rodape/rodape.component';

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

  devices = [
    { id: 1, nome: 'Notebook - Chrome', status: 'Ativo', ip: '192.168.1.100', ultimoAcesso: '2 min atrás' },
    { id: 2, nome: 'Celular - Android', status: 'Ativo', ip: '192.168.1.101', ultimoAcesso: '15 min atrás' },
    { id: 3, nome: 'Tablet - iPad', status: 'Inativo', ip: '192.168.1.102', ultimoAcesso: '2 dias atrás' }
  ];

  get hasPlan(): boolean {
    return !!this.currentUser && this.currentUser.plano !== 'Nenhum plano' && this.currentUser.plano !== '';
  }

  invoices = [
    { id: 1, data: '31/03/2026', valor: 'AOA 5.99', status: 'Pago', metodo: 'Cartão' },
    { id: 2, data: '31/02/2026', valor: 'AOA 5.99', status: 'Pago', metodo: 'Cartão' },
    { id: 3, data: '31/01/2026', valor: 'AOA 5.99', status: 'Pago', metodo: 'Cartão' }
  ];

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

    this.currentUser = this.authService.getCurrentUser();
  }

  selectTab(tab: string): void {
    this.activeTab = tab;
  }

  disconnectDevice(deviceId: number): void {
    alert(`Dispositivo ${deviceId} desconectado`);
    // Em produção, seria uma chamada HTTP
  }

  downloadInvoice(invoiceId: number): void {
    alert(`Baixando fatura ${invoiceId}`);
    // Em produção, seria um download real
  }

  changePlan(newPlan: string): void {
    if (this.currentUser && this.currentUser.plano !== newPlan) {
      const confirmed = confirm(`Alterar para ${newPlan}?`);
      if (confirmed) {
        this.authService.updatePlano(newPlan);
        this.currentUser = this.authService.getCurrentUser();
        alert('Plano alterado com sucesso!');
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
