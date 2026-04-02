// app/menu/rodape/protecao.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-protecao',
  standalone: true,
  imports: [RouterModule],
  template: `
   <h1>Proteção de Dados</h1>

<p>Última atualização: 2026</p>

<h2>1. Compromisso</h2>
<p>
A Angolan VPN compromete-se a garantir a proteção e confidencialidade dos dados pessoais dos seus utilizadores.
</p>

<h2>2. Base Legal</h2>
<p>
O tratamento de dados é realizado em conformidade com a Lei n.º 22/11 – Lei de Proteção de Dados Pessoais de Angola.
</p>

<h2>3. Recolha e Tratamento</h2>
<p>
Os dados recolhidos são limitados ao necessário para prestação dos serviços e são tratados de forma segura.
</p>

<h2>4. Armazenamento</h2>
<p>
Os dados são armazenados apenas pelo tempo necessário para cumprir as finalidades para as quais foram recolhidos.
</p>

<h2>5. Segurança</h2>
<p>
São implementadas medidas técnicas para evitar perda, acesso indevido ou divulgação não autorizada.
</p>

<h2>6. Direitos dos Titulares</h2>
<ul>
  <li>Acesso aos dados;</li>
  <li>Correção;</li>
  <li>Eliminação;</li>
  <li>Oposição ao tratamento.</li>
</ul>

<h2>7. Contacto</h2>
<p>
Para questões relacionadas com dados pessoais, o utilizador pode contactar a Angolan VPN através dos canais oficiais.
</p>
  `,
  styles: [`
    .container { padding: 2rem; max-width: 800px; margin: auto; font-family: Arial, sans-serif; }
    h1 { margin-bottom: 1rem; font-size: 2rem; }
    p { line-height: 1.6; color: #333; }
  `]
})
export class ProtecaoComponent {}