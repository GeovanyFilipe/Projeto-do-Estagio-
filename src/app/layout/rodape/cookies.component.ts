// app/menu/rodape/cookies.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cookies',
  standalone: true,
  imports: [RouterModule],
  template: `
    <h1>Política de Cookies</h1>

<p>Última atualização: 2026</p>

<h2>1. O que são Cookies?</h2>
<p>
Cookies são pequenos ficheiros armazenados no dispositivo do utilizador para melhorar a experiência de navegação.
</p>

<h2>2. Tipos de Cookies Utilizados</h2>
<ul>
  <li><strong>Cookies essenciais:</strong> necessários para o funcionamento do site;</li>
  <li><strong>Cookies de desempenho:</strong> ajudam a analisar o uso do site;</li>
  <li><strong>Cookies de funcionalidade:</strong> guardam preferências do utilizador.</li>
</ul>

<h2>3. Finalidade</h2>
<p>
Utilizamos cookies para melhorar o desempenho, segurança e experiência do utilizador.
</p>

<h2>4. Gestão de Cookies</h2>
<p>
O utilizador pode configurar o seu navegador para bloquear ou eliminar cookies a qualquer momento.
</p>

<h2>5. Alterações</h2>
<p>
Esta política pode ser atualizada conforme necessário.
</p>
  `,
  styles: [`
    .container { padding: 2rem; max-width: 800px; margin: auto; font-family: Arial, sans-serif; }
    h1 { margin-bottom: 1rem; font-size: 2rem; }
    p { line-height: 1.6; color: #333; }
  `]
})
export class CookiesComponent {}