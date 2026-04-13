import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../../layout/menu/menu.component';
import { RodapeComponent } from '../../../layout/rodape/rodape.component';

@Component({
    selector: 'app-negocio',
    standalone: true,
    imports: [CommonModule, MenuComponent, RodapeComponent],
    templateUrl: './negocio.component.html',
    styleUrl: './negocio.component.css'
})
export class NegocioComponent {
      specs = [
    { icon: '💻', titulo: 'Dispositivos', descricao: '1 dispositivo por conta' },
    { icon: '⚡', titulo: 'Desempenho', descricao: 'Velocidade máxima disponível' },
    { icon: '🌐', titulo: 'CDNs Locais', descricao: 'Acesso otimizado a CDNs angolanas' },
    { icon: '🛡️', titulo: 'Estabilidade', descricao: 'Conexão estável para uso diário' },
    { icon: '🔒', titulo: 'Segurança', descricao: 'Criptografia AES-256' },
    { icon: '🎯', titulo: 'Suporte', descricao: 'Suporte por email e chat' },
  ];
 }