import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../layout/menu/menu.component';
import { SliderComponent } from '../layout/slider/slider.component';
import { SpecsComponent } from '../layout/specs/specs.component';
import { RodapeComponent } from '../layout/rodape/rodape.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MenuComponent,
    SliderComponent,
    SpecsComponent,
    RodapeComponent
  ],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  standalone: true
})
export class InicioComponent implements OnInit {
  slides = [
  '/imagens/pexels-cottonbro-5077064.jpg',
  '/imagens/pexels-ivan-s-8117815.jpg',
  '/imagens/pexels-sanketgraphy-16773547.jpg'
];
  currentSlide = 0;

  ngOnInit(): void {
    this.startSlider();
  }

  startSlider(): void {
    setInterval(() => {
      this.nextSlide();
    }, 5000); // troca a cada 5 segundos
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }
}
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  // Para controlar o dropdown de "Planos" no Hero
  activeDropdown: string | null = null;
  isAuthenticated = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.isAuthenticated$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });
  }

  // Alterna dropdown
  toggleDropdown(dropdown: string) {
    this.activeDropdown = this.activeDropdown === dropdown ? null : dropdown;
  }

  // Navegar para cadastro/teste grátis
  goToCadastro() {
    this.router.navigate(['/login'], { queryParams: { mode: 'register' } });
  }

  // Navegar para cada plano
  goToPlano(plano: string) {
    if (plano === 'youtube') {
      this.router.navigate(['/planos/youtube']);
    } else if (plano === 'gov') {
      this.router.navigate(['/planos/gobierno']);
    }
  }

  // Navegar para mapa dos servidores
  goToMapa() {
    this.router.navigate(['/mapa']);
  }
}
