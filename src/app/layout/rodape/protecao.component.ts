// app/menu/rodape/protecao.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RodapeComponent } from './rodape.component';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-protecao',
  standalone: true,
  imports: [RouterModule, MenuComponent, RodapeComponent],
  template: `
    <app-menu></app-menu>

  <div class="protecao-container">
    <div class="protecao-header">
      <h1>Proteção de Dados</h1>
      <p class="updated">Última atualização: 2026</p>
      <p>A Angolan VPN valoriza a privacidade e protege seus dados pessoais de acordo com a Lei n.º 22/11.</p>
    </div>

    <section class="protecao-section">
      <h2>1. Compromisso</h2>
      <p>Comprometemo-nos a proteger e manter a confidencialidade dos dados pessoais dos utilizadores.</p>
    </section>

    <section class="protecao-section">
      <h2>2. Base Legal</h2>
      <p>O tratamento de dados segue a Lei de Proteção de Dados Pessoais de Angola (Lei n.º 22/11).</p>
    </section>

    <section class="protecao-section">
      <h2>3. Recolha e Tratamento</h2>
      <p>Os dados são coletados apenas quando necessários para fornecer e melhorar o serviço.</p>
    </section>

    <section class="protecao-section">
      <h2>4. Armazenamento</h2>
      <p>Dados são armazenados pelo tempo necessário e eliminados quando não são mais requeridos.</p>
    </section>

    <section class="protecao-section">
      <h2>5. Segurança</h2>
      <p>Implementamos medidas técnicas e administrativas para evitar perda, abuso ou acesso não autorizado.</p>
    </section>

    <section class="protecao-section">
      <h2>6. Direitos dos Titulares</h2>
      <ul>
        <li>Acesso aos dados;</li>
        <li>Correção;</li>
        <li>Eliminação;</li>
        <li>Oposição ao tratamento.</li>
      </ul>
    </section>

    <section class="protecao-section">
      <h2>7. Contacto</h2>
      <p>Para questões, use os canais oficiais da Angolan VPN.</p>
    </section>
  </div>
   <app-rodape></app-rodape>
  `,
  styles: [`
    .protecao-container {
      max-width: 900px;
      margin: 30px auto 60px;
      padding: 24px;
      background: #f7faff;
      border: 1px solid #e1e8f0;
      border-radius: 10px;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
      font-family: 'Ubuntu', Arial, sans-serif;
      color: #1a2a45;
      line-height: 1.7;
    }

    .protecao-header h1 {
      margin: 0;
      font-size: 2.2rem;
      color: #0f2f61;
    }

    .updated {
      margin: 0.65rem 0 1rem;
      color: #4d6a8d;
      font-size: 0.94rem;
    }

    .protecao-section {
      padding-bottom: 1rem;
      border-bottom: 1px solid #dce6f1;
      margin-bottom: 1.5rem;
    }

    .protecao-section:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }

    .protecao-section h2 {
      margin: 0 0 0.5rem;
      font-size: 1.25rem;
      color: #16407a;
      font-weight: 700;
    }

    .protecao-section p {
      margin: 0 0 0.8rem;
      font-size: 1rem;
    }

    .protecao-section ul {
      margin: 0.25rem 0 0.8rem 1.1rem;
      padding: 0;
      list-style: disc;
      color: #233749;
    }

    .protecao-section li {
      margin: 0.25rem 0;
      font-size: 0.98rem;
    }

    @media (max-width: 700px) {
      .protecao-container {
        padding: 18px;
        margin: 20px auto 40px;
      }

      .protecao-header h1 {
        font-size: 1.8rem;
      }

      .protecao-section h2 {
        font-size: 1.1rem;
      }
    }
  `]
})
export class ProtecaoComponent {}