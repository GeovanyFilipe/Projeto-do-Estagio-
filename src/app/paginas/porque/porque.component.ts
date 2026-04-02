import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../layout/menu/menu.component';

@Component({
  selector: 'app-porque',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: './porque.component.html',
  styleUrl: './porque.component.css'
})
export class PorqueComponent {
  razoes = [
    {
      titulo: 'Privacidade Total',
      descricao: 'Sua privacidade é nossa prioridade. Criptografia de ponta a ponta em todas as conexões.',
      icon: '🔒'
    },
    {
      titulo: 'Velocidade',
      descricao: 'Servidores otimizados para garantir a melhor velocidade de conexão possível.',
      icon: '⚡'
    },
    {
      titulo: 'Suporte 24/7',
      descricao: 'Suporte técnico em português disponível 24 horas, 7 dias por semana.',
      icon: '💬'
    },
    {
      titulo: 'Baixo Custo',
      descricao: 'Os preços mais competitivos do mercado com recursos premium.',
      icon: '💰'
    }
  ];
}
