import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MenuComponent } from '../../layout/menu/menu.component';
import { RodapeComponent } from '../../layout/rodape/rodape.component';
import { AuthService } from '../../services/auth.service';
import { DataConnect } from 'firebase/data-connect';
import { createInvoice } from '@dataconnect/generated';



@Component({
  selector: 'app-compra',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MenuComponent, RodapeComponent],
  templateUrl: './compra.component.html',
  styleUrl: './compra.component.css'
})
export class CompraComponent {
  private dataconnect: DataConnect = inject(DataConnect);
  metodoPagamento: 'cartao' | 'ekwanza' = 'cartao';

  tipoCartao: string = '';

  // Campos do formulário para validação
  numeroCartao: string = '';
  dataValidade: string = '';
  cvv: string = '';
  telefoneEkwanza: string = '';

  planoSelecionadoKey: string = '';

  plano: any = {
    nome: '',
    preco: '',
    descricao: ''
  };

  planos: any = {
    individual: {
      nome: 'Plano Individual',
      preco: '6.000 Kz',
      descricao: 'Navegar em serviços angolanos com rapidez e segurança'
    },
    negocio: {
      nome: 'Plano Startup',
      preco: '15.000 Kz',
      descricao: 'Acelere o crescimento da sua startup com conexão segura e alta performance'
    },

    empresarial: {
      nome: 'Plano Empresarial',
      preco: '60.000 Kz',
      descricao: 'Operações empresariais rápidas, seguras e sem interrupções'
    },
    educacional: {
      nome: 'Plano Educacional',
      preco: '10.000 Kz',
      descricao: 'Ambiente online seguro e controlado para estudantes e membros'
    }
  };

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    this.route.params.subscribe(params => {
      this.planoSelecionadoKey = params['plano'];

      this.plano =
        this.planos[this.planoSelecionadoKey] ||
        this.planos['individual'];
    });
  }

  async finalizarCompra() {
    if (this.metodoPagamento === 'cartao') {
      if (!this.numeroCartao || !this.dataValidade || !this.cvv) {
        alert('Por favor, preencha todos os dados do cartão.');
        return;
      }
    } else if (this.metodoPagamento === 'ekwanza') {
      if (!this.telefoneEkwanza) {
        alert('Por favor, introduza o número de telefone para o pagamento via E-Kwanza.');
        return;
      }
    }

    try {
      await this.authService.updatePlano(this.planoSelecionadoKey);
      
      // Regista a Fatura no PGLite
      const user = this.authService.getCurrentUser();
      if (user) {
        // Extrai o preço numérico do string (ex: "6.000 Kz" -> 6000)
        const valorNumerico = parseFloat(this.plano.preco.replace(/[^0-9]/g, ''));
        
        await createInvoice(this.dataconnect, {
          id: crypto.randomUUID(),
          userId: user.id,
          amount: valorNumerico,
          currency: 'AOA',
          paymentMethod: this.metodoPagamento === 'cartao' ? 'Cartão de Crédito' : 'E-Kwanza',
          status: 'Pago',
          createdAt: new Date().toISOString(),
          planName: this.plano.nome
        });
      }

      alert('Pagamento processado com sucesso! Plano ativado.');
      this.router.navigate(['/admin']);
    } catch (err) {
      console.error('Erro ao processar compra no PGLite:', err);
      alert('Erro ao processar pagamento. Tente novamente.');
    }

  }


  formatarCartao(event: any) {
    let valor = event.target.value.replace(/\D/g, '');

    // Detecção da bandeira
    if (valor.startsWith('4')) {
      this.tipoCartao = 'visa';
    } else if (valor.startsWith('5') || valor.startsWith('2')) {
      // Simplificando: Mastercard geralmente começa com 5 ou 2 (série 2221-2720)
      this.tipoCartao = 'mastercard';
    } else {
      this.tipoCartao = '';
    }

    // Formatação 0000 0000 0000 0000
    valor = valor.replace(/(.{4})/g, '$1 ').trim();
    event.target.value = valor.substring(0, 19);
  }

  formatarValidade(event: any) {
    let valor = event.target.value.replace(/\D/g, '');
    if (valor.length > 2) {
      valor = valor.substring(0, 2) + '/' + valor.substring(2, 4);
    } else {
      valor = valor.substring(0, 2);
    }
    event.target.value = valor;
  }

  formatarCVV(event: any) {
    let valor = event.target.value.replace(/\D/g, '');
    event.target.value = valor.substring(0, 3);
  }

  formatarTelefone(event: any) {
    let valor = event.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
    this.telefoneEkwanza = valor.substring(0, 9); // Limita a 9 dígitos
    event.target.value = this.telefoneEkwanza;
  }
}