import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { MenuComponent } from '../../layout/menu/menu.component';
import { RodapeComponent } from '../../layout/rodape/rodape.component';

@Component({
  selector: 'app-porque',
  standalone: true,
  imports: [CommonModule, RouterModule, MenuComponent, RodapeComponent],
  templateUrl: './porque.component.html',
  styleUrl: './porque.component.css'
})
export class PorqueComponent {
  razoes = [
    {
      titulo: 'Privacidade Total',
      descricao: 'Sua privacidade é nossa prioridade. Criptografia de ponta a ponta em todas as conexões.',
      icon: 'fa-solid fa-lock'
    },
    {
      titulo: 'Velocidade',
      descricao: 'Servidores otimizados para garantir a melhor velocidade de conexão possível.',
      icon: 'fa-solid fa-bolt'
    },
    {
      titulo: 'Suporte 24/7',
      descricao: 'Suporte técnico em português disponível 24 horas, 7 dias por semana.',
      icon: 'fa-solid fa-comments'
    },
    {
      titulo: 'Baixo Custo',
      descricao: 'Os preços mais competitivos do mercado com recursos premium.',
      icon: 'fa-solid fa-money-bill'
    }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  goToCadastro() {
    this.router.navigate(['/login'], { queryParams: { mode: 'register' } });
  }
}


