// app/menu/rodape/termos.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RodapeComponent } from './rodape.component';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-termos',
  standalone: true,
  imports: [RouterModule, MenuComponent, RodapeComponent],
  template: `
  <app-menu></app-menu>
  <div class="termos-container">
    <div class="termos-header">
      <h1>Termos e Condições</h1>
      <p class="last-updated">Última atualização: 2026</p>
      <p class="intro">Leia atentamente estes termos antes de utilizar o serviço Angolan VPN. O uso do serviço implica aceitação plena e total destes termos.</p>
    </div>

    <section class="term-section">
      <h2>1. Aceitação dos Termos</h2>
      <p>Ao aceder e utilizar os serviços da Angolan VPN, o utilizador concorda com os presentes Termos e Condições e com a legislação aplicável. Caso não concorde, deve cessar imediatamente a utilização.</p>
    </section>

    <section class="term-section">
      <h2>2. Descrição do Serviço</h2>
      <p>A Angolan VPN oferece serviço de VPN para proteger a privacidade, segurança na navegação e acesso a conteúdos de forma segura.</p>
    </section>

    <section class="term-section">
      <h2>3. Uso Aceitável</h2>
      <p>O utilizador compromete-se a NÃO utilizar o serviço para:</p>
      <ul>
        <li>Atividades ilegais conforme a legislação angolana;</li>
        <li>Distribuição de conteúdos ilícitos ou ofensivos;</li>
        <li>Fraude, hacking ou acesso não autorizado;</li>
        <li>Violação de direitos de terceiros.</li>
      </ul>
    </section>

    <section class="term-section">
      <h2>4. Responsabilidade do Utilizador</h2>
      <p>O utilizador é responsável pelas atividades realizadas na sua conta. A Angolan VPN não se responsabiliza por uso indevido ou por ações de terceiros.</p>
    </section>

    <section class="term-section">
      <h2>5. Privacidade e Proteção de Dados</h2>
      <p>Comprometemo-nos a proteger os dados pessoais conforme a Lei de Proteção de Dados Pessoais de Angola (Lei n.º 22/11).</p>
    </section>

    <section class="term-section">
      <h2>6. Limitação de Responsabilidade</h2>
      <p>O serviço é fornecido "como está". Não garantimos disponibilidade ininterrupta ou livre de erros, e não nos responsabilizamos por perdas diretas ou indiretas decorrentes do uso.</p>
    </section>

    <section class="term-section">
      <h2>7. Suspensão ou Cancelamento</h2>
      <p>Reservamo-nos o direito de suspender ou cancelar contas que violem estes termos sem aviso prévio.</p>
    </section>

    <section class="term-section">
      <h2>8. Alterações aos Termos</h2>
      <p>Estes termos podem ser atualizados a qualquer momento. Consulte esta página periodicamente.</p>
    </section>

    <section class="term-section">
      <h2>9. Legislação Aplicável</h2>
      <p>Os termos são regidos pelas leis da República de Angola. Litígios serão resolvidos pelos tribunais competentes.</p>
    </section>

    <section class="term-section">
      <h2>10. Contacto</h2>
      <p>Para dúvidas ou suporte, utilize os canais oficiais da Angolan VPN.</p>
    </section>
  </div>
  <app-rodape></app-rodape>
  `,
  styles: [`
    .termos-container {
      max-width: 900px;
      margin: 30px auto 60px;
      padding: 24px;
      background: #f7faff;
      border: 1px solid #e1e8f0;
      border-radius: 10px;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
      font-family: 'Ubuntu', Arial, Helvetica, sans-serif;
      color: #1a2a45;
      line-height: 1.7;
    }

    .termos-header h1 {
      margin: 0;
      font-size: 2.2rem;
      color: #0f2f61;
    }

    .last-updated {
      margin: 0.6rem 0 1rem;
      color: #4d6a8d;
      font-size: 0.94rem;
    }

    .intro {
      margin-bottom: 1.4rem;
      font-size: 1rem;
    }

    .term-section {
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #dce6f1;
    }

    .term-section:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }

    .term-section h2 {
      margin: 0 0 0.55rem;
      font-size: 1.25rem;
      color: #16407a;
      font-weight: 700;
    }

    .term-section p {
      margin: 0 0 0.8rem;
      font-size: 1rem;
    }

    .term-section ul {
      margin: 0.25rem 0 0.8rem 1.1rem;
      padding: 0;
      list-style: disc;
      color: #233749;
    }

    .term-section li {
      margin: 0.25rem 0;
      font-size: 0.98rem;
    }

    @media (max-width: 700px) {
      .termos-container {
        padding: 18px;
        margin: 20px auto 40px;
      }

      .termos-header h1 {
        font-size: 1.8rem;
      }

      .term-section h2 {
        font-size: 1.1rem;
      }
    }
  `]
})
export class TermosComponent { }