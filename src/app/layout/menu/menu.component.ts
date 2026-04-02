import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
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
    private router: Router
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
  }

  // ================= MOBILE MENU =================
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    this.activeDropdown = null;
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

  // ================= UTILITÁRIO =================
  isDropdownOpen(dropdown: string): boolean {
    return this.activeDropdown === dropdown;
  }
}