import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../../layout/menu/menu.component';
import { RodapeComponent } from '../../layout/rodape/rodape.component';

@Component({
  selector: 'app-compra',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MenuComponent, RodapeComponent],
  templateUrl: './compra.component.html',
  styleUrl: './compra.component.css'
})
export class CompraComponent {

  metodoPagamento: string = 'cartao';
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
      nome: 'Plano de Negócio',
      preco: '15.000 Kz',
      descricao: 'Melhor desempenho para trabalhar com sistemas angolanos sem falhas'
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

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.planoSelecionadoKey = params['plano'];

      this.plano =
        this.planos[this.planoSelecionadoKey] ||
        this.planos['individual'];
    });
  }

  finalizarCompra() {
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

    console.log('Método:', this.metodoPagamento);
    console.log('Plano:', this.planoSelecionadoKey);
    console.log('Detalhes:', this.plano);
    
    alert('Pagamento processado com sucesso! Verifique o seu dispositivo para confirmação.');
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
}