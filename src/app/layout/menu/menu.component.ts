import { Component, OnInit, OnDestroy, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  isMobileMenuOpen = false;
  activeDropdown: string | null = null;
  isAuthenticated = false;
  currentUser: User | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.pipe(takeUntil(this.destroy$))
      .subscribe(isAuth => this.isAuthenticated = isAuth);

    this.authService.currentUser$.pipe(takeUntil(this.destroy$))
      .subscribe(user => this.currentUser = user);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    // Garante que o scroll fica restaurado se o componente for destruído com menu aberto
    document.documentElement.classList.remove('menu-open');
  }

  // ================= MOBILE MENU =================
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
    this.activeDropdown = null;
    document.documentElement.classList.remove('menu-open');
  }

  // ================= DROPDOWN =================
  toggleDropdown(dropdown: string) {
    this.activeDropdown = this.activeDropdown === dropdown ? null : dropdown;
  }

  openDropdown(dropdown: string) {
    this.activeDropdown = dropdown;
  }

  closeDropdown(dropdown: string) {
    if (this.activeDropdown === dropdown) {
      this.activeDropdown = null;
    }
  }

  // ================= NAVIGATION =================
  goToLogin(): void {
    this.router.navigate(['/login']);
    this.closeMobileMenu();
  }

  goToCadastro(): void {
    this.router.navigate(['/cadastro']); // ajusta conforme sua rota de cadastro
    this.closeMobileMenu();
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
    this.closeMobileMenu();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
    this.closeMobileMenu();
  }

  goToPlanos(): void {
    this.router.navigate(['/planos']);
    this.closeMobileMenu();
  }

  goToPerfil(): void {
    this.router.navigate(['/cliente/dashboard'], { fragment: 'perfil' });
    this.closeMobileMenu();
  }

  goToSuporte(): void {
    this.router.navigate(['/suporte/tecnico']);
    this.closeMobileMenu();
  }

  isDropdownOpen(dropdown: string): boolean {
    return this.activeDropdown === dropdown;
  }

  // Fechar dropdowns ao clicar fora do componente
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.activeDropdown = null;
    }
  }
}