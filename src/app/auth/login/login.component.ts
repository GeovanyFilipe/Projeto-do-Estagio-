import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
  state,
} from '@angular/animations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('logoEntrance', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.5) translateY(-20px)' }),
        animate(
          '600ms cubic-bezier(0.34, 1.56, 0.64, 1)',
          style({ opacity: 1, transform: 'scale(1) translateY(0)' })
        ),
      ]),
    ]),
    trigger('formSwitch', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateX(-20px)' })),
      ]),
    ]),
    trigger('alertSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('250ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' })),
      ]),
    ]),
    trigger('boxEntrance', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class LoginComponent implements OnInit, OnDestroy {
  isRegister = false;
  loading = false;
  error = '';
  success = '';

  // LOGIN
  loginEmail = '';
  loginPassword = '';

  // REGISTER
  registerName = '';
  registerEmail = '';
  registerPassword = '';

  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Verificar se deve começar no registro
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(params => {
      if (params['mode'] === 'register') {
        this.isRegister = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleForm(): void {
    this.isRegister = !this.isRegister;
    this.error = '';
    this.success = '';
  }

  // Wrapper para satisfazer o HTML que usa submit()
  submit(): void {
    if (this.isRegister) {
      this.register();
    } else {
      this.login();
    }
  }

  async login() {
    if (!this.loginEmail || !this.loginPassword) {
      this.error = 'Preencha todos os campos';
      return;
    }

    this.loading = true;
    this.error = '';
    
    try {
      await this.authService.login(this.loginEmail, this.loginPassword);
      this.success = 'Bem-vindo de volta!';
      setTimeout(() => this.router.navigate(['/cliente/dashboard']), 1000);
    } catch (err: any) {
      this.error = this.mapError(err.code);
    } finally {
      this.loading = false;
    }
  }

  async register() {
    if (!this.registerEmail || !this.registerPassword || !this.registerName) {
      this.error = 'Preencha todos os campos';
      return;
    }

    this.loading = true;
    this.error = '';

    try {
      await this.authService.register(
        this.registerEmail,
        this.registerPassword,
        this.registerName,
        'Nenhum plano'
      );
      this.success = 'Conta criada com sucesso!';
      setTimeout(() => this.router.navigate(['/cliente/dashboard']), 1500);
    } catch (err: any) {
      this.error = this.mapError(err.code);
    } finally {
      this.loading = false;
    }
  }

  async loginWithGoogle() {
    try {
      this.loading = true;
      await this.authService.loginWithGoogle();
      this.router.navigate(['/cliente/dashboard']);
    } catch (err: any) {
      this.error = 'Erro ao entrar com Google';
    } finally {
      this.loading = false;
    }
  }

  private mapError(code: string): string {
    switch (code) {
      case 'auth/user-not-found': return 'Utilizador não encontrado.';
      case 'auth/wrong-password': return 'Senha incorreta.';
      case 'auth/email-already-in-use': return 'Este email já está em uso.';
      case 'auth/weak-password': return 'A senha é muito fraca.';
      case 'auth/invalid-email': return 'Email inválido.';
      default: return 'Ocorreu um erro. Tente novamente.';
    }
  }
}