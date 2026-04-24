import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../../layout/menu/menu.component';
import { RodapeComponent } from '../../../layout/rodape/rodape.component';
import emailjs from '@emailjs/browser';
import type { EmailJSResponseStatus } from '@emailjs/browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tecnico',
  standalone: true,
  imports: [CommonModule, MenuComponent, RodapeComponent, FormsModule],
  templateUrl: './tecnico.component.html',
  styleUrl: './tecnico.component.css'
})
export class TecnicoComponent {
  nome = '';
  email = '';
  telefone = '';
  produto = 'AngolanVPN App'; // Default product
  mensagemTecnica = '';
  urlanexo = '';

  isLoading = false;
  status: 'idle' | 'success' | 'error' = 'idle';
  statusMessage = '';

  abrirChatAoVivo() {
    const whatsappUrl = 'https://wa.me/244937754502';
    window.open(whatsappUrl, '_blank');
  }

  enviarMensagem() {
    if (!this.nome || !this.email || !this.mensagemTecnica || !this.telefone) {
      this.status = 'error';
      this.statusMessage = 'Por favor, preencha todos os campos obrigatórios.';
      return;
    }

    this.isLoading = true;
    this.status = 'idle';

    // envia o email usando o template específico de Suporte Técnico
    emailjs.send(
      'service_94cybzf',
      'template_ckd0ye9', 
      {
        name: this.nome, // Agora o 'name' principal é o nome do utilizador
        subject: 'Suporte Técnico',
        nome: this.nome,
        email: this.email,
        telefone: this.telefone,
        produto: this.produto,
        mensagemTecnica: this.mensagemTecnica,
        urlanexo: this.urlanexo || 'Nenhum link fornecido'
      },
      'oS30F7gUdd16Lkhxx' // publicKey
    ).then((res: EmailJSResponseStatus) => {
      this.isLoading = false;
      this.status = 'success';
      this.statusMessage = 'Pedido de suporte enviado! Um técnico entrará em contacto em breve.';

      // limpa os campos
      this.nome = '';
      this.email = '';
      this.telefone = '';
      this.mensagemTecnica = '';
      this.urlanexo = '';

      setTimeout(() => {
        if (this.status === 'success') this.status = 'idle';
      }, 5000);

      console.log('Suporte Técnico enviado!', res);
    }, (err) => {
      this.isLoading = false;
      this.status = 'error';
      this.statusMessage = 'Erro ao enviar pedido técnico. Tenta novamente ou usa o WhatsApp.';
      console.error('Erro EmailJS:', err);
    });
  }
}


