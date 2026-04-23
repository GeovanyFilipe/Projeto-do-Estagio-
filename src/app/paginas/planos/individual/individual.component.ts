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
    { icon: 'fa-solid fa-mobile-screen', titulo: 'Dispositivos', descricao: 'Até 2 dispositivos simultâneos' },
    { icon: 'fa-solid fa-bolt', titulo: 'Velocidade', descricao: 'Velocidade estável para uso diário' },
    { icon: 'fa-solid fa-globe', titulo: 'Servidores Locais', descricao: 'Conexão com servidores em Angola' },
    { icon: 'fa-solid fa-shield-halved', titulo: 'Estabilidade', descricao: 'Conexão confiável para navegação e apps' },
    { icon: 'fa-solid fa-lock', titulo: 'Segurança', descricao: 'Criptografia básica de dados' },
    { icon: 'fa-solid fa-comments', titulo: 'Suporte', descricao: 'Suporte por email e chat' },
    ];
}