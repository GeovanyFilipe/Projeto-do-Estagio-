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

  planoSelecionado: string = '';

  planos: any = {
    individual: {
      nome: 'Plano Individual',
      preco: '6.000 Kz',
      descricao: 'Conectividade para uso pessoal'
    },
    negocio: {
      nome: 'Plano de Negócio',
      preco: '15.000 Kz',
      descricao: 'Ideal para pequenas empresas e startups'
    },
    empresarial: {
      nome: 'Plano Empresarial',
      preco: '60.000 Kz',
      descricao: 'Solução corporativa avançada'
    },
    educacional: {
      nome: 'Plano Educacional',
      preco: '10.000 Kz',
      descricao: 'Solução corporativa avançada'
    }
  };

  plano: any = {
    nome: '',
    preco: '',
    descricao: ''
  };

  formData = {
    nome: '',
    email: '',
    telefone: '',
    empresa: ''
  };

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.planoSelecionado = params['plano'];

      this.plano = this.planos[this.planoSelecionado] || this.planos['individual'];
    });
  }

  finalizarCompra() {
    console.log('Plano:', this.planoSelecionado);
    console.log('Dados:', this.formData);
    alert('Pedido enviado com sucesso!');
  }
}