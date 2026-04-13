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
    { icon: '📱', titulo: 'Dispositivos', descricao: 'Até 2 dispositivos simultâneos' },
    { icon: '⚡', titulo: 'Velocidade', descricao: 'Velocidade estável para uso diário' },
    { icon: '🌍', titulo: 'Servidores Locais', descricao: 'Conexão com servidores em Angola' },
    { icon: '🛡️', titulo: 'Estabilidade', descricao: 'Conexão confiável para navegação e apps' },
    { icon: '🔒', titulo: 'Segurança', descricao: 'Criptografia básica de dados' },
    { icon: '💬', titulo: 'Suporte', descricao: 'Suporte por email e chat' },
    ];
}