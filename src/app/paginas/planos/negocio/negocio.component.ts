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
    { icon: '💻', titulo: 'Dispositivos', descricao: '5 dispositivos simultâneos' },
    { icon: '⚡', titulo: 'Desempenho', descricao: 'Velocidade mais rápida e estável' },
    { icon: '🌐', titulo: 'CDNs Locais', descricao: 'Acesso otimizado a plataformas empresariais como ERP e CRM' },
    { icon: '🛡️', titulo: 'Estabilidade', descricao: 'Conexão estável para uso diário' },
    { icon: '🔒', titulo: 'Segurança', descricao: 'Criptografia avançada' },
    { icon: '🎯', titulo: 'Suporte', descricao: 'Suporte prioritário básico' },
  ];
 }