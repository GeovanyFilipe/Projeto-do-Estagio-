// app/menu/rodape/privacidade.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-privacidade',
  standalone: true,
  imports: [RouterModule],
  template: `
    <h1>Política de Privacidade</h1>

<p>Última atualização: 2026</p>

<h2>1. Introdução</h2>
<p>
A Angolan VPN valoriza a privacidade dos seus utilizadores e compromete-se a proteger os seus dados pessoais, em conformidade com a legislação da República de Angola, especialmente a Lei de Proteção de Dados Pessoais (Lei n.º 22/11).
</p>

<h2>2. Dados Recolhidos</h2>
<p>Podemos recolher os seguintes dados:</p>
<ul>
  <li>Nome e informações de registo;</li>
  <li>Email e dados de contacto;</li>
  <li>Informações de utilização do serviço;</li>
  <li>Endereço IP e dados técnicos.</li>
</ul>

<h2>3. Finalidade do Uso dos Dados</h2>
<p>Os dados são utilizados para:</p>
<ul>
  <li>Fornecer e melhorar os serviços;</li>
  <li>Garantir segurança e prevenção de fraudes;</li>
  <li>Comunicação com o utilizador;</li>
  <li>Cumprimento de obrigações legais.</li>
</ul>

<h2>4. Partilha de Dados</h2>
<p>
A Angolan VPN não vende dados pessoais. Os dados apenas podem ser partilhados com autoridades competentes quando exigido por lei.
</p>

<h2>5. Segurança</h2>
<p>
Adotamos medidas técnicas e organizacionais adequadas para proteger os dados contra acessos não autorizados.
</p>

<h2>6. Direitos do Utilizador</h2>
<p>O utilizador tem direito a:</p>
<ul>
  <li>Aceder aos seus dados;</li>
  <li>Solicitar correção ou eliminação;</li>
  <li>Retirar o consentimento;</li>
  <li>Apresentar reclamação às autoridades competentes.</li>
</ul>

<h2>7. Alterações</h2>
<p>
Esta política pode ser atualizada a qualquer momento.
</p>
  `,
  styles: [`
    .container { padding: 2rem; max-width: 800px; margin: auto; font-family: Arial, sans-serif; }
    h1 { margin-bottom: 1rem; font-size: 2rem; }
    p { line-height: 1.6; color: #333; }
  `]
})
export class PrivacidadeComponent {}