// app/menu/rodape/termos.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-termos',
  standalone: true,
  imports: [RouterModule],
  template: `
  <h1>Termos e Condições</h1>

<p>Última atualização: 2026</p>

<h2>1. Aceitação dos Termos</h2>
<p>
Ao aceder e utilizar os serviços da Angolan VPN, o utilizador concorda com os presentes Termos e Condições, bem como com a legislação aplicável na República de Angola.
Caso não concorde com estes termos, deve cessar imediatamente a utilização do serviço.
</p>

<h2>2. Descrição do Serviço</h2>
<p>
A Angolan VPN oferece serviços de rede privada virtual (VPN) com o objetivo de proteger a privacidade dos utilizadores, garantir segurança na navegação e permitir acesso a conteúdos online de forma segura.
</p>

<h2>3. Uso Aceitável</h2>
<p>O utilizador compromete-se a NÃO utilizar o serviço para:</p>
<ul>
  <li>Atividades ilegais conforme a legislação angolana;</li>
  <li>Distribuição de conteúdos ilícitos ou ofensivos;</li>
  <li>Fraude, hacking ou tentativa de acesso não autorizado;</li>
  <li>Violação de direitos de terceiros.</li>
</ul>

<h2>4. Responsabilidade do Utilizador</h2>
<p>
O utilizador é totalmente responsável pelas atividades realizadas através da sua conta.
A Angolan VPN não se responsabiliza por uso indevido do serviço.
</p>

<h2>5. Privacidade e Proteção de Dados</h2>
<p>
A Angolan VPN compromete-se a proteger os dados pessoais dos utilizadores, em conformidade com a Lei de Proteção de Dados Pessoais de Angola (Lei n.º 22/11).
</p>

<h2>6. Limitação de Responsabilidade</h2>
<p>
A Angolan VPN não garante que o serviço será ininterrupto ou livre de erros.
Não nos responsabilizamos por perdas diretas ou indiretas resultantes do uso do serviço.
</p>

<h2>7. Suspensão ou Cancelamento</h2>
<p>
Reservamo-nos o direito de suspender ou encerrar contas que violem estes termos, sem aviso prévio.
</p>

<h2>8. Alterações aos Termos</h2>
<p>
Os presentes termos podem ser atualizados a qualquer momento. Recomendamos que o utilizador consulte esta página regularmente.
</p>

<h2>9. Legislação Aplicável</h2>
<p>
Estes termos são regidos pelas leis da República de Angola.
Qualquer litígio será resolvido nos tribunais competentes de Angola.
</p>

<h2>10. Contacto</h2>
<p>
Para dúvidas ou suporte, entre em contacto através dos canais oficiais da Angolan VPN.
</p>
  `,
  styles: [`
    .container { padding: 2rem; max-width: 800px; margin: auto; font-family: Arial, sans-serif; }
    h1 { margin-bottom: 1rem; font-size: 2rem; }
    p { line-height: 1.6; color: #333; }
  `]
})
export class TermosComponent {}