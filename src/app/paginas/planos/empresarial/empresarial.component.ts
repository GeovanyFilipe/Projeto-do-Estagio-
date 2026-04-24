import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuComponent } from '../../../layout/menu/menu.component';
import { RodapeComponent } from '../../../layout/rodape/rodape.component';

@Component({
  selector: 'app-empresarial',
  standalone: true,
  imports: [CommonModule, RouterModule, MenuComponent, RodapeComponent],
  templateUrl: './empresarial.component.html',
  styleUrl: './empresarial.component.css'
})
export class EmpresarialComponent {
  specs = [
    { icon: 'fa-solid fa-laptop', titulo: 'Dispositivos', descricao: 'Até 15 dispositivos simultâneos' },
    { icon: 'fa-solid fa-bolt', titulo: 'Desempenho', descricao: 'Alta velocidade + baixa latência garantida' },
    { icon: 'fa-solid fa-globe', titulo: 'CDNs Locais', descricao: 'Acesso otimizado a CDNs angolanas' },
    { icon: 'fa-solid fa-shield-halved', titulo: 'Estabilidade', descricao: 'Estabilidade para sistemas críticos' },
    { icon: 'fa-solid fa-lock', titulo: 'Segurança', descricao: 'Criptografia de nível empresarial' },
    { icon: 'fa-solid fa-bullseye', titulo: 'Suporte', descricao: 'Suporte prioritário 24/7' },
  ];
}