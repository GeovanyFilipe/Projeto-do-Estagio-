import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, LoginResponse } from '../../services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  email: string = '';
  password: string = '';
  nome: string = '';
  isRegister: boolean = false;
  loading: boolean = false;
  error: string = '';
  success: string = '';
  returnUrl: string = '';
  selectedPlano: string = '';

  private destroy$ = new Subject<void>();

  planos = [
    { id: 'youtube', nome: 'Plano YouTube sem Anúncios', preco: 'AOA 5.99/mês' },
    { id: 'gov', nome: 'Plano .GOV.AO', preco: 'AOA 9.99/mês' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/cliente/dashboard';
    const mode = this.route.snapshot.queryParams['mode'];
    if (mode === 'register') this.isRegister = true;

    if (this.authService.isAuthenticated()) {
      this.router.navigate([this.returnUrl]);
    }
  }

  toggleForm(): void {
    this.isRegister = !this.isRegister;
    this.error = '';
    this.success = '';
    this.email = '';
    this.password = '';
    this.nome = '';
  }

  login(): void {
    if (!this.email || !this.password) {
      this.error = 'Por favor, preencha todos os campos';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.login(this.email, this.password)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: LoginResponse) => {
          this.loading = false;
          this.success = 'Login realizado com sucesso!';
          setTimeout(() => this.router.navigate([this.returnUrl]), 1500);
        },
        error: (err: any) => {
          this.loading = false;
          this.error = err.message || 'Erro ao fazer login. Tente novamente.';
        }
      });
  }

  register(): void {
    if (!this.email || !this.password || !this.nome) {
      this.error = 'Por favor, preencha todos os campos';
      return;
    }

    if (this.password.length < 6) {
      this.error = 'A senha deve ter pelo menos 6 caracteres';
      return;
    }

    this.loading = true;
    this.error = '';

    const plano = this.selectedPlano || this.planos[0].id;

    this.authService.register(this.email, this.password, this.nome, plano)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: LoginResponse) => {
          this.loading = false;
          this.success = 'Cadastro realizado com sucesso! Bem-vindo!';
          setTimeout(() => this.router.navigate([this.returnUrl]), 1500);
        },
        error: (err: any) => {
          this.loading = false;
          this.error = err.message || 'Erro ao fazer cadastro. Tente novamente.';
        }
      });
  }

  submit(): void {
    if (this.isRegister) this.register();
    else this.login();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}