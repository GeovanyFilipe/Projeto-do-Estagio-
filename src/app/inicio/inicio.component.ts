import { Component, OnInit, OnDestroy, HostListener, ElementRef } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../layout/menu/menu.component';
import { SliderComponent } from '../layout/slider/slider.component';
import { SpecsComponent } from '../layout/specs/specs.component';
import { RodapeComponent } from '../layout/rodape/rodape.component';
import { AuthService } from '../services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit, OnDestroy {
  // Para controlar o dropdown de "Planos" no Hero
  activeDropdown: string | null = null;
  isAuthenticated = false;
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private authService: AuthService,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    this.authService.isAuthenticated$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
    this.router.navigate(['/planos']);
  }

  // Navegar para mapa dos servidores
  goToMapa() {
    this.router.navigate(['/mapa']);
  }

  // Fechar dropdown ao clicar fora
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.activeDropdown = null;
    }
  }
}