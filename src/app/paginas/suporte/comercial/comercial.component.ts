import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../../../layout/menu/menu.component';

@Component({
  selector: 'app-comercial',
  standalone: true,
  imports: [CommonModule, FormsModule, MenuComponent],
  templateUrl: './comercial.component.html',
  styleUrl: './comercial.component.css'
})
export class ComercialComponent {
  nome = '';
  email = '';
  mensagem = '';

  enviarMensagem() {
    if (!this.nome || !this.email || !this.mensagem) {
      alert('Por favor, preencha todos os campos antes de enviar.');
      return;
    }

    alert('Mensagem enviada com sucesso! Nossa equipe comercial irá contactá-lo em breve.');

    this.nome = '';
    this.email = '';
    this.mensagem = '';
  }
}

