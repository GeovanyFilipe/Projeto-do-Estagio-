import { Component, OnInit, OnDestroy, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
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
    this.authService.isAuthenticated$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isAuth => this.isAuthenticated = isAuth);

    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => this.currentUser = user);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    document.documentElement.classList.remove('menu-open');
  }

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

  toggleDropdown(dropdown: string) {
    this.activeDropdown = this.activeDropdown === dropdown ? null : dropdown;
  }

  isDropdownOpen(dropdown: string): boolean {
    return this.activeDropdown === dropdown;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.activeDropdown = null;
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
    this.closeMobileMenu();
  }

  goToCadastro() {
    this.router.navigate(['/cadastro']);
    this.closeMobileMenu();
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
    this.closeMobileMenu();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
    this.closeMobileMenu();
  }

  goToPlanos() {
    this.router.navigate(['/planos']);
    this.closeMobileMenu();
  }

  goToPerfil() {
    this.router.navigate(['/cliente/dashboard'], { fragment: 'perfil' });
    this.closeMobileMenu();
  }

  goToSuporte() {
    this.router.navigate(['/suporte/tecnico']);
    this.closeMobileMenu();
  }
}