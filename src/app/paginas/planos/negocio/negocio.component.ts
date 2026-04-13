import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuComponent } from '../../../layout/menu/menu.component';
import { RodapeComponent } from '../../../layout/rodape/rodape.component';

@Component({
    selector: 'app-negocio',
    standalone: true,
    imports: [CommonModule,RouterModule, MenuComponent, RodapeComponent],
    templateUrl: './negocio.component.html',
    styleUrl: './negocio.component.css'
})
export class NegocioComponent {
    specs = [
  { icon: '💻', titulo: 'Dispositivos', descricao: 'Até 5 dispositivos simultâneos' },
  { icon: '⚡', titulo: 'Velocidade', descricao: 'Velocidade rápida e estável' },
  { icon: '📡', titulo: 'Baixa Latência', descricao: 'Ideal para sistemas e serviços locais' },
  { icon: '🌐', titulo: 'Plataformas Empresariais', descricao: 'Acesso otimizado a ERP, CRM e serviços online' },
  { icon: '🔒', titulo: 'Segurança', descricao: 'Criptografia avançada de dados' },
  { icon: '🎧', titulo: 'Suporte', descricao: 'Suporte prioritário básico' },
];
 }