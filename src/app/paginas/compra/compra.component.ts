import { Component, inject, NgZone, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MenuComponent } from '../../layout/menu/menu.component';
import { RodapeComponent } from '../../layout/rodape/rodape.component';
import { AuthService } from '../../services/auth.service';
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { createInvoice } from '@dataconnect/generated';



@Component({
  selector: 'app-compra',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MenuComponent, RodapeComponent],
  templateUrl: './compra.component.html',
  styleUrl: './compra.component.css'
})
export class CompraComponent implements OnDestroy {
  metodoPagamento: 'cartao' | 'ekwanza' = 'cartao';

  tipoCartao: string = '';

  // Campos do formulário para validação
  numeroCartao: string = '';
  dataValidade: string = '';
  cvv: string = '';
  telefoneEkwanza: string = '';

  planoSelecionadoKey: string = '';
  private destroy$ = new Subject<void>();

  private ngZone: NgZone = inject(NgZone);

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
    private router: Router,
    private http: HttpClient
  ) {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        this.planoSelecionadoKey = params['plano'];

        this.plano =
          this.planos[this.planoSelecionadoKey] ||
          this.planos['individual'];
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
      // 1. Atualiza o plano em memória/admin
      await this.authService.updatePlanLocally(String(this.planoSelecionadoKey));
      
      // 2. Chamar a Cloud Function para processar o pagamento com Stripe
      const idToken = await this.authService.getIdToken();
      if (!idToken) throw new Error('Utilizador não autenticado.');

      // URL da função (Ajustar conforme a região de deploy)
      const functionUrl = 'https://us-central1-angolanvpn-b8e9c.cloudfunctions.net/createPayment';
      
      const precoLimpo = String(this.plano.preco || '0').replace(/[^0-9]/g, '');
      const valorNumerico = parseFloat(precoLimpo) || 0;

      const body = {
        paymentMethodId: 'pm_card_visa', // Simulado por agora, viria de um Stripe Element
        amount: valorNumerico,
        planName: this.plano.nome
      };

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${idToken}`,
        'Content-Type': 'application/json'
      });

      // Chamada HTTP para o backend real
      await this.http.post(functionUrl, body, { headers }).toPromise();

      alert('Pagamento processado com sucesso via Backend! Plano ativado.');
      this.router.navigate(['/admin']);
    } catch (err: any) {
      const errorMsg = err?.message ? String(err.message) : 'Erro desconhecido';
      console.error('Erro ao processar compra no Firebase:', errorMsg);
      alert('Erro ao processar pagamento: ' + errorMsg);
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