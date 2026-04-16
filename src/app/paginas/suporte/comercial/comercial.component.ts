import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../../../layout/menu/menu.component';
import { RodapeComponent } from '../../../layout/rodape/rodape.component';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-comercial',
  standalone: true,
  imports: [CommonModule, FormsModule, MenuComponent, RodapeComponent],
  templateUrl: './comercial.component.html',
  styleUrls: ['./comercial.component.css']
})
export class ComercialComponent {
  nome = '';
  email = '';
  mensagem = '';
  telefone = '';  
  
  formatarTelefone(event: any) {
    let valor = event.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
    this.telefone = valor.substring(0, 9); // Limita a 9 dígitos
    event.target.value = this.telefone;
  }

  enviarMensagem() {
    if (!this.nome || !this.email || !this.mensagem) {
      alert('Por favor, preencha todos os campos antes de enviar.');
      return;
    }

    // envia o email
    emailjs.send(
      'service_8v4flwl',
      'template_230v28n',
      {
        nome: this.nome,
        email: this.email,
        mensagem: this.mensagem
      },
      '7OIcnpDmePvmmZsDa' // publicKey
    ).then((res: EmailJSResponseStatus) => {
      // sucesso
      alert('Mensagem enviada com sucesso! Nossa equipe comercial irá contactá-lo em breve.');

      // limpa os campos do formulário
      this.nome = '';
      this.email = '';
      this.mensagem = '';

      console.log('Email enviado com sucesso!', res);
    }, (err) => {
      // erro
      alert('Erro ao enviar mensagem. Por favor, tente novamente.');
      console.error('Erro ao enviar email:', err);
    });
  }
}