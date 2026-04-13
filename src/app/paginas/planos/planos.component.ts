import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuComponent } from '../../layout/menu/menu.component';
import { RodapeComponent } from '../../layout/rodape/rodape.component';

@Component({
  selector: 'app-planos',
  standalone: true,
  imports: [CommonModule, RouterModule, MenuComponent,RodapeComponent],
  templateUrl: './planos.component.html',
  styleUrl: './planos.component.css'
})
export class PlanosComponent {
  planos = [
    {
      titulo: '🏢 Plano Empresarial',
      preco: 'Sob consulta',
      descricao: 'Ideal para empresas médias e grandes',
      features: [
        '10+ dispositivos (expansível)',
        'Alta velocidade + baixa latência garantida',
        'Acesso otimizado a CDNs angolanas',
        'Estabilidade para sistemas críticos',
        'Criptografia de nível empresarial',
        'Suporte prioritário 24/7'
      ],
      cta: 'Assinar Agora',
      rota: '/planos/empresarial',
      destaque: true
    },
    {
      titulo: '🏢 Plano Individual',
      preco: 'Sob consulta',
      descricao: 'Ideal para empresas médias e grandes',
      features: [
        'Até 2 dispositivos simultâneos',
        'Conexão com servidores em Angola',
        'Velocidade padrão (estável para navegação diária)',
        ' Acesso a serviços angolanos (portais, bancos, etc.)',
        'Criptografia básica de dados',
        'Suporte padrão (email ou chat)',
      ],
      cta: 'Assinar agora',
      rota: '/planos/individual',
      destaque: true
    }
  ];
}
