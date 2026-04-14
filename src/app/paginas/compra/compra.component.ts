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
    console.log('Plano:', this.planoSelecionadoKey);
    console.log('Detalhes:', this.plano);
    alert('Pedido enviado com sucesso!');
  }

  formatarCartao(event: any) {
    let valor = event.target.value.replace(/\D/g, '');
    valor = valor.replace(/(.{4})/g, '$1 ').trim();
    event.target.value = valor;
  }
}