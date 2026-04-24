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
  styleUrls: ['./educacional.component.css']
})
export class EducacionalComponent {

  specs = [
    { icon: 'fa-solid fa-laptop-code', titulo: 'Dispositivos', descricao: 'Até 10 dispositivos simultâneos' },
    { icon: 'fa-solid fa-bolt', titulo: 'Velocidade', descricao: 'Velocidade estável para múltiplos usuários' },
    { icon: 'fa-solid fa-globe', titulo: 'Plataformas Educacionais', descricao: 'Acesso seguro a plataformas de ensino' },
    { icon: 'fa-solid fa-shield-virus', titulo: 'Proteção', descricao: 'Proteção contra phishing e ameaças online' },
    { icon: 'fa-solid fa-lock', titulo: 'Controle de Conteúdo', descricao: 'Filtro de sites impróprios' },
    { icon: 'fa-solid fa-chart-column', titulo: 'Gestão de Uso', descricao: 'Controle de utilização da internet' },
    { icon: 'fa-solid fa-headset', titulo: 'Suporte', descricao: 'Suporte técnico dedicado' },
  ];

}