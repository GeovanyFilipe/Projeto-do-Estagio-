import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuComponent } from '../../../layout/menu/menu.component';
import { RodapeComponent } from '../../../layout/rodape/rodape.component';

@Component({
  selector: 'app-educacional',
  standalone: true,
  imports: [CommonModule, RouterModule, MenuComponent, RodapeComponent],
  templateUrl: './educacional.component.html',
  styleUrl: './educacional.component.css'
})
export class EducacionalComponent {
  specs = [
    { icon: '💻', titulo: 'Dispositivos', descricao: '10+ dispositivos (expansível)' },
    { icon: '⚡', titulo: 'Desempenho', descricao: 'Alta velocidade + baixa latência garantida' },
    { icon: '🌐', titulo: 'CDNs Locais', descricao: 'Acesso otimizado a CDNs angolanas' },
    { icon: '🛡️', titulo: 'Estabilidade', descricao: 'Estabilidade para sistemas críticos' },
    { icon: '🔒', titulo: 'Segurança', descricao: 'Criptografia de nível empresarial' },
    { icon: '🎯', titulo: 'Suporte', descricao: 'Suporte prioritário 24/7' },
  ];
}
