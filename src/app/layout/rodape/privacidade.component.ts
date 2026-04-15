// app/menu/rodape/privacidade.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { RodapeComponent } from './rodape.component';

@Component({
  selector: 'app-privacidade',
  standalone: true,
  imports: [RouterModule, MenuComponent, RodapeComponent],
  template: `

    <app-menu></app-menu>

  <div class="privacidade-container">
    <div class="privacidade-header">
      <h1>Política de Privacidade</h1>
      <p class="last-updated">Última atualização: 2026</p>
      <p>A Angolan VPN valoriza a sua privacidade e explica como coletamos, usamos e protegemos os seus dados.</p>
    </div>

    <section class="privacidade-section">
      <h2>1. Introdução</h2>
      <p>Estamos comprometidos com a conformidade da Lei de Proteção de Dados Pessoais de Angola (Lei n.º 22/11).</p>
    </section>

    <section class="privacidade-section">
      <h2>2. Dados Recolhidos</h2>
      <p>Podemos recolher:</p>
      <ul>
        <li>Nome e informações de registo;</li>
        <li>Email e dados de contacto;</li>
        <li>Dados de uso do serviço;</li>
        <li>Endereço IP e dados técnicos.</li>
      </ul>
    </section>

    <section class="privacidade-section">
      <h2>3. Finalidade</h2>
      <p>Os dados são usados para fornecer, proteger e melhorar o serviço, comunicar com você e cumprir obrigações legais.</p>
    </section>

    <section class="privacidade-section">
      <h2>4. Partilha de Dados</h2>
      <p>Dados pessoais não são vendidos. São partilhados apenas com autoridades ou parceiros quando exigido por lei.</p>
    </section>

    <section class="privacidade-section">
      <h2>5. Segurança</h2>
      <p>Adotamos medidas técnicas e organizacionais para proteger dados contra acesso não autorizado e ameaças.</p>
    </section>

    <section class="privacidade-section">
      <h2>6. Direitos do Utilizador</h2>
      <ul>
        <li>Acesso aos dados;</li>
        <li>Correção e eliminação;</li>
        <li>Retirada de consentimento;</li>
        <li>Reclamação junto às autoridades competentes.</li>
      </ul>
    </section>

    <section class="privacidade-section">
      <h2>7. Alterações</h2>
      <p>Esta política pode ser atualizada; consulte regularmente para novos detalhes.</p>
    </section>
  </div>
  <app-rodape></app-rodape>
  `,
  styles: [`
    .privacidade-container {
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

    .privacidade-header h1 {
      margin: 0;
      font-size: 2.2rem;
      color: #0f2f61;
    }

    .last-updated {
      margin: 0.65rem 0 1rem;
      color: #4d6a8d;
      font-size: 0.94rem;
    }

    .privacidade-section {
      padding-bottom: 1rem;
      border-bottom: 1px solid #dce6f1;
      margin-bottom: 1.5rem;
    }

    .privacidade-section:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }

    .privacidade-section h2 {
      margin: 0 0 0.5rem;
      font-size: 1.25rem;
      color: #16407a;
      font-weight: 700;
    }

    .privacidade-section p {
      margin: 0 0 0.8rem;
      font-size: 1rem;
    }

    .privacidade-section ul {
      margin: 0.25rem 0 0.8rem 1.1rem;
      padding: 0;
      list-style: disc;
      color: #233749;
    }

    .privacidade-section li {
      margin: 0.25rem 0;
      font-size: 0.98rem;
    }

    @media (max-width: 700px) {
      .privacidade-container {
        padding: 18px;
        margin: 20px auto 40px;
      }

      .privacidade-header h1 {
        font-size: 1.8rem;
      }

      .privacidade-section h2 {
        font-size: 1.1rem;
      }
    }
  `]
})
export class PrivacidadeComponent { }