import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { MenuComponent } from '../layout/menu/menu.component';
import { SliderComponent } from '../layout/slider/slider.component';
import { SpecsComponent } from '../layout/specs/specs.component';
import { RodapeComponent } from '../layout/rodape/rodape.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    RouterModule,
    MenuComponent,
    SliderComponent,
    SpecsComponent,
    RodapeComponent
  ],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  // Para controlar o dropdown de "Planos" no Hero
  activeDropdown: string | null = null;

  constructor(private router: Router) {}

  // Alterna dropdown
  toggleDropdown(dropdown: string) {
    this.activeDropdown = this.activeDropdown === dropdown ? null : dropdown;
  }

  // Navegar para cadastro/teste grátis
  goToCadastro() {
    this.router.navigate(['/login']);
  }

  // Navegar para cada plano
  goToPlano(plano: string) {
    if (plano === 'youtube') {
      this.router.navigate(['/planos/youtube']);
    } else if (plano === 'gov') {
      this.router.navigate(['/planos/gobierno']);
    }
  }
}