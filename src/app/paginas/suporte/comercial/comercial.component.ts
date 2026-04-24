import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../../../layout/menu/menu.component';
import { RodapeComponent } from '../../../layout/rodape/rodape.component';
import emailjs from '@emailjs/browser';
import type { EmailJSResponseStatus } from '@emailjs/browser';

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

  isLoading = false;
  status: 'idle' | 'success' | 'error' = 'idle';
  statusMessage = '';

  formatarTelefone(event: any) {
    let valor = event.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
    this.telefone = valor.substring(0, 9); // Limita a 9 dígitos
    if (event.target) {
      event.target.value = this.telefone;
    }
  }

  enviarMensagem() {
    if (!this.nome || !this.email || !this.mensagem || !this.telefone) {
      this.status = 'error';
      this.statusMessage = 'Por favor, preencha todos os campos antes de enviar.';
      return;
    }

    this.isLoading = true;
    this.status = 'idle';

    // envia o email
    emailjs.send(
      'service_94cybzf',
      'template_ckd0ye9',
      {
        name: this.nome,
        subject: 'Suporte Comercial',
        nome: this.nome,
        email: this.email,
        telefone: this.telefone,
        produto: 'Consulta Comercial',
        mensagemTecnica: this.mensagem,
        urlanexo: 'N/A'
      },
      'oS30F7gUdd16Lkhxx' // publicKey
    ).then((res: EmailJSResponseStatus) => {
      this.isLoading = false;
      this.status = 'success';
      this.statusMessage = 'Mensagem enviada com sucesso! Nossa equipe comercial irá contactá-lo em breve.';

      // limpa os campos do formulário
      this.nome = '';
      this.email = '';
      this.telefone = '';
      this.mensagem = '';

      // Limpa a mensagem de sucesso após 5 segundos
      setTimeout(() => {
        if (this.status === 'success') this.status = 'idle';
      }, 5000);

      console.log('Email enviado com sucesso!', res);
    }, (err) => {
      this.isLoading = false;
      this.status = 'error';
      this.statusMessage = 'Erro ao enviar mensagem. Por favor, tente novamente.';
      console.error('Erro ao enviar email:', err);
    });
  }
}