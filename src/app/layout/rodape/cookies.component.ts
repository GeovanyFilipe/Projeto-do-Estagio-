// app/menu/rodape/cookies.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { RodapeComponent } from './rodape.component';

@Component({
  selector: 'app-cookies',
  standalone: true,
  imports: [RouterModule, MenuComponent, RodapeComponent],
  template: `

  <app-menu></app-menu>
  <div class="cookies-container">
    <div class="cookies-header">
      <h1>Política de Cookies</h1>
      <p class="last-updated">Última atualização: 2026</p>
      <p>Esta política explica como usamos cookies para melhorar sua experiência no site.</p>
    </div>

    <section class="cookies-section">
      <h2>1. O que são Cookies?</h2>
      <p>Cookies são pequenos ficheiros armazenados no seu dispositivo para melhorar a navegação.</p>
    </section>

    <section class="cookies-section">
      <h2>2. Tipos de Cookies</h2>
      <ul>
        <li><strong>Essenciais:</strong> necessários para o funcionamento do site;</li>
        <li><strong>Desempenho:</strong> ajudam a analisar o uso do site;</li>
        <li><strong>Funcionalidade:</strong> guardam preferências do utilizador.</li>
      </ul>
    </section>

    <section class="cookies-section">
      <h2>3. Finalidade</h2>
      <p>Usamos cookies para melhorar desempenho, segurança e experiência do utilizador.</p>
    </section>

    <section class="cookies-section">
      <h2>4. Gestão de Cookies</h2>
      <p>O utilizador pode configurar o navegador para bloquear ou eliminar cookies a qualquer momento.</p>
    </section>

    <section class="cookies-section">
      <h2>5. Alterações</h2>
      <p>Esta política pode ser atualizada sempre que necessário.</p>
    </section>
  </div>
  <app-rodape></app-rodape>
  `,
  styles: [`
    .cookies-container {
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

    .cookies-header h1 {
      margin: 0;
      font-size: 2.2rem;
      color: #0f2f61;
    }

    .last-updated {
      margin: 0.65rem 0 1rem;
      color: #4d6a8d;
      font-size: 0.94rem;
    }

    .cookies-section {
      padding-bottom: 1rem;
      border-bottom: 1px solid #dce6f1;
      margin-bottom: 1.5rem;
    }

    .cookies-section:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }

    .cookies-section h2 {
      margin: 0 0 0.5rem;
      font-size: 1.25rem;
      color: #16407a;
      font-weight: 700;
    }

    .cookies-section p {
      margin: 0 0 0.8rem;
      font-size: 1rem;
    }

    .cookies-section ul {
      margin: 0.25rem 0 0.8rem 1.1rem;
      padding: 0;
      list-style: disc;
      color: #233749;
    }

    .cookies-section li {
      margin: 0.25rem 0;
      font-size: 0.98rem;
    }

    @media (max-width: 700px) {
      .cookies-container {
        padding: 18px;
        margin: 20px auto 40px;
      }

      .cookies-header h1 {
        font-size: 1.8rem;
      }

      .cookies-section h2 {
        font-size: 1.1rem;
      }
    }
  `]
})
export class CookiesComponent {}