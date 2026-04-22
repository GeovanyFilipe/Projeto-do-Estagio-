import {
  Component, OnInit, OnDestroy, AfterViewInit,
  HostListener, ElementRef, PLATFORM_ID, inject
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../layout/menu/menu.component';
import { SliderComponent } from '../layout/slider/slider.component';
import { SpecsComponent } from '../layout/specs/specs.component';
import { RodapeComponent } from '../layout/rodape/rodape.component';
import { AuthService } from '../services/auth.service';
import { AnimationService } from '../services/animation.service';
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
    RodapeComponent,
  ],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit, AfterViewInit, OnDestroy {
  activeDropdown: string | null = null;
  isAuthenticated = false;

  private destroy$ = new Subject<void>();
  private platformId = inject(PLATFORM_ID);

  constructor(
    private router: Router,
    private authService: AuthService,
    private el: ElementRef,
    private animationService: AnimationService,
  ) { }

  ngOnInit() {
    this.authService.isAuthenticated$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isAuth => {
        this.isAuthenticated = isAuth;
      });
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Inicialização do ScrollTrigger (necessário para animações de scroll internas)
    this.animationService.initScrollTrigger();
    
    // NOTA: O entrance da página agora é gerido globalmente pelo AppComponent
    // para garantir consistência em todas as rotas do sistema.
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    // Limpar ScrollTriggers ao destruir o componente
    this.animationService.killAll();
  }

  // Alterna dropdown
  toggleDropdown(dropdown: string) {
    this.activeDropdown = this.activeDropdown === dropdown ? null : dropdown;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const dropdownTrigger = this.el.nativeElement.querySelector('.btn-secondary');
    if (dropdownTrigger && !dropdownTrigger.contains(event.target)) {
      this.activeDropdown = null;
    }
  }

  goToCadastro() {
    this.router.navigate(['/login'], { queryParams: { mode: 'register' } });
  }

  goToPlano(plano: string) {
    this.router.navigate(['/planos']);
  }

  goToMapa() {
    this.router.navigate(['/mapa']);
  }
}