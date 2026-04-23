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
  { icon: 'fa-solid fa-laptop', titulo: 'Dispositivos', descricao: 'Até 5 dispositivos simultâneos' },
  { icon: 'fa-solid fa-bolt', titulo: 'Velocidade', descricao: 'Velocidade rápida e estável' },
  { icon: 'fa-solid fa-satellite-dish', titulo: 'Baixa Latência', descricao: 'Ideal para sistemas e serviços locais' },
  { icon: 'fa-solid fa-globe', titulo: 'Plataformas Empresariais', descricao: 'Acesso otimizado a ERP, CRM e serviços online' },
  { icon: 'fa-solid fa-lock', titulo: 'Segurança', descricao: 'Criptografia avançada de dados' },
  { icon: 'fa-solid fa-headset', titulo: 'Suporte', descricao: 'Suporte prioritário básico' },
];
}