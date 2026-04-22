import {
  Component, OnInit, OnDestroy, HostListener, ElementRef, AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { AnimationService } from '../../services/animation.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  trigger, state, style, animate, transition, query, stagger
} from '@angular/animations';

/* ══════════════════════════════════════════════
   ANGULAR ANIMATIONS — definidas fora do decorator
══════════════════════════════════════════════ */

/** Painel lateral mobile — desliza da direita */
const menuSlide = trigger('menuSlide', [
  state('closed', style({ transform: 'translateX(100%)', opacity: 0 })),
  state('open',   style({ transform: 'translateX(0)',    opacity: 1 })),
  transition('closed => open', [
    animate('280ms cubic-bezier(0.4, 0, 0.2, 1)')
  ]),
  transition('open => closed', [
    animate('220ms cubic-bezier(0.4, 0, 0.6, 1)')
  ]),
]);

/** Conteúdo do dropdown — fade + slide descendente */
const dropdownFade = trigger('dropdownFade', [
  state('void, hidden', style({ opacity: 0, transform: 'translateY(-8px)' })),
  state('visible',      style({ opacity: 1, transform: 'translateY(0)' })),
  transition('hidden => visible, void => visible', [
    animate('200ms cubic-bezier(0.4, 0, 0.2, 1)')
  ]),
  transition('visible => hidden, visible => void', [
    animate('150ms cubic-bezier(0.4, 0, 0.6, 1)')
  ]),
]);

/** Overlay de fundo mobile — fade simples */
const overlayFade = trigger('overlayFade', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('250ms ease', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    animate('200ms ease', style({ opacity: 0 })),
  ]),
]);

/** Accordion mobile — expande/colapsa por max-height */
const accordionSlide = trigger('accordionSlide', [
  state('collapsed', style({ maxHeight: '0px', opacity: 0, overflow: 'hidden' })),
  state('expanded',  style({ maxHeight: '400px', opacity: 1, overflow: 'hidden' })),
  transition('collapsed <=> expanded', [
    animate('320ms cubic-bezier(0.4, 0, 0.2, 1)')
  ]),
]);

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [menuSlide, dropdownFade, overlayFade, accordionSlide],
})
export class MenuComponent implements OnInit, AfterViewInit, OnDestroy {

  isMobileMenuOpen = false;
  isProfileMenuOpen = false;
  activeDropdown: string | null = null;
  isAuthenticated = false;
  currentUser: User | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    public authService: AuthService,
    private router: Router,
    private elementRef: ElementRef,
    private animationService: AnimationService,
  ) { }

  ngOnInit(): void {
    this.authService.isAuthenticated$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isAuth => this.isAuthenticated = isAuth);

    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => this.currentUser = user);
  }

  ngAfterViewInit(): void {
    // Efeito GSAP: navbar muda sombra ao rolar a página
    this.animationService.navbarScroll('.navbar');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    document.documentElement.classList.remove('menu-open');
  }

  /* ── Estado para binding de animações ── */
  get menuState(): 'open' | 'closed' {
    return this.isMobileMenuOpen ? 'open' : 'closed';
  }

  dropdownState(dropdown: string): 'visible' | 'hidden' {
    return this.activeDropdown === dropdown ? 'visible' : 'hidden';
  }

  accordionState(dropdown: string): 'expanded' | 'collapsed' {
    return this.activeDropdown === dropdown ? 'expanded' : 'collapsed';
  }

  /* ── Métodos de controlo ── */
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isMobileMenuOpen) {
      document.documentElement.classList.add('menu-open');
    } else {
      document.documentElement.classList.remove('menu-open');
    }
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    this.isProfileMenuOpen = false;
    this.activeDropdown = null;
    document.documentElement.classList.remove('menu-open');
  }

  toggleProfileMenu(event: Event) {
    event.stopPropagation();
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  toggleDropdown(dropdown: string | null) {
    if (dropdown === null) {
      this.activeDropdown = null;
    } else {
      this.activeDropdown = this.activeDropdown === dropdown ? null : dropdown;
    }
  }

  /* ── Lógica de Hover (Desktop) ── */
  onMouseEnter(dropdown: string) {
    // Apenas no desktop (pode verificar largura ou ignorar se mobile-open estiver ativo)
    if (!this.isMobileMenuOpen) {
      this.activeDropdown = dropdown;
    }
  }

  onMouseLeave() {
    if (!this.isMobileMenuOpen) {
      this.activeDropdown = null;
    }
  }

  isDropdownOpen(dropdown: string): boolean {
    return this.activeDropdown === dropdown;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.activeDropdown = null;
      this.isProfileMenuOpen = false;
    }
  }

  goToLogin()     { this.router.navigate(['/login']);                                          this.closeMobileMenu(); }
  goToCadastro()  { this.router.navigate(['/registro']);                                       this.closeMobileMenu(); }
  goToDashboard() { this.router.navigate(['/cliente/dashboard']);                              this.closeMobileMenu(); }
  goToPlanos()    { this.router.navigate(['/planos']);                                         this.closeMobileMenu(); }
  goToPerfil()    { this.router.navigate(['/cliente/dashboard'], { fragment: 'perfil' });      this.closeMobileMenu(); }
  goToSuporte()   { this.router.navigate(['/suporte/tecnico']);                                this.closeMobileMenu(); }

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
    this.closeMobileMenu();
  }
}