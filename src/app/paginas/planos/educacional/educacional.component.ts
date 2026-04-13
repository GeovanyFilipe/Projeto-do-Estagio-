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
    { icon: '👨‍💻', titulo: 'Dispositivos', descricao: 'Até 10 dispositivos simultâneos' },
    { icon: '⚡', titulo: 'Velocidade', descricao: 'Velocidade estável para múltiplos usuários' },
    { icon: '🌐', titulo: 'Plataformas Educacionais', descricao: 'Acesso seguro a plataformas de ensino' },
    { icon: '🛡️', titulo: 'Proteção', descricao: 'Proteção contra phishing e ameaças online' },
    { icon: '🔒', titulo: 'Controle de Conteúdo', descricao: 'Filtro de sites impróprios' },
    { icon: '📊', titulo: 'Gestão de Uso', descricao: 'Controle de utilização da internet' },
    { icon: '🎧', titulo: 'Suporte', descricao: 'Suporte técnico dedicado' },
  ];

}