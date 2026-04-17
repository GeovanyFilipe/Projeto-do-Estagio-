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

  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Pega a URL de retorno da query ou padrão para o painel
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/cliente/dashboard';

    // Verificar se deve iniciar no modo cadastro
    const mode = this.route.snapshot.queryParams['mode'];
    if (mode === 'register') {
      this.isRegister = true;
    }

    // Se já estiver autenticado, redirecionar para returnUrl
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

          setTimeout(() => {
            // Redireciona para a página de onde o usuário veio
            this.router.navigateByUrl(this.returnUrl);
          }, 1500);
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

    // Cadastro sem plano - usuário escolherá depois
    this.authService.register(this.email, this.password, this.nome, '')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: LoginResponse) => {
          this.loading = false;
          this.success = 'Cadastro realizado com sucesso! Bem-vindo!';
          setTimeout(() => {
            // Redireciona para a página de onde o usuário veio
            this.router.navigateByUrl(this.returnUrl);
          }, 1500);
        },
        error: (err: any) => {
          this.loading = false;
          this.error = err.message || 'Erro ao fazer cadastro. Tente novamente.';
        }
      });
  }

  submit(): void {
    if (this.isRegister) {
      this.register();
    } else {
      this.login();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
