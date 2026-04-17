import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { MenuComponent } from '../../layout/menu/menu.component';
import { RodapeComponent } from '../../layout/rodape/rodape.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
  private destroy$ = new Subject<void>();

  // Listas vazias por padrão para novos usuários
  devices: any[] = [];
  invoices: any[] = [];

  constructor(
    private authService: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.currentUser = user;
        // Se o usuário deslogar enquanto estiver no dashboard, redireciona
        if (!user && !this.showLogoutConfirm) {
          this.router.navigate(['/login']);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get hasPlan(): boolean {
    return !!this.currentUser && this.currentUser.plano !== 'Nenhum plano' && this.currentUser.plano !== '';
  }

  selectTab(tab: string): void {
    this.activeTab = tab;
  }

  disconnectDevice(deviceId: number): void {
    alert(`Dispositivo ${deviceId} desconectado`);
  }

  downloadInvoice(invoiceId: number): void {
    alert(`Baixando fatura ${invoiceId}`);
  }

  changePlan(newPlan: string): void {
    if (this.currentUser && this.currentUser.plano !== newPlan) {
      const confirmed = confirm(`Alterar para ${newPlan}?`);
      if (confirmed) {
        this.authService.updatePlano(newPlan);
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

  async logout(): Promise<void> {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }

  cancelLogout(): void {
    this.showLogoutConfirm = false;
  }
}
