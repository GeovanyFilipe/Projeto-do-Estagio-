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
      titulo: 'Plano YouTube sem Anúncios',
      preco: 5.99,
      descricao: 'Acesse YouTube sem interrupções',
      features: ['Acesso YouTube', 'Sem anúncios', 'HD 1080p', 'Suporte básico'],
      cta: 'Contratar Plano',
      rota: '/planos/youtube'
    },
    {
      titulo: 'Plano .GOV.AO',
      preco: 9.99,
      descricao: 'Acesso privilegiado a recursos governamentais',
      features: ['Acesso .GOV.AO', 'Prioridade', 'IP Premium', 'Suporte prioritário'],
      cta: 'Contratar Plano',
      rota: '/planos/gobierno',
      destaque: true
    }
  ];
}
