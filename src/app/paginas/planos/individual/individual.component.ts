import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuComponent } from '../../../layout/menu/menu.component';
import { RodapeComponent } from '../../../layout/rodape/rodape.component';

@Component({
  selector: 'app-individual',
  standalone: true,
  imports: [CommonModule, RouterModule, MenuComponent, RodapeComponent],
  templateUrl: './individual.component.html',
  styleUrl: './individual.component.css'
})
export class IndividualComponent {
  specs = [
    { icon: '💻', titulo: 'Dispositivos', descricao: '1 dispositivo por conta' },
    { icon: '⚡', titulo: 'Desempenho', descricao: 'Velocidade máxima disponível' },
    { icon: '🌐', titulo: 'CDNs Locais', descricao: 'Acesso otimizado a CDNs angolanas' },
    { icon: '🛡️', titulo: 'Estabilidade', descricao: 'Conexão estável para uso diário' },
    { icon: '🔒', titulo: 'Segurança', descricao: 'Criptografia AES-256' },
    { icon: '🎯', titulo: 'Suporte', descricao: 'Suporte por email e chat' },
  ];
}