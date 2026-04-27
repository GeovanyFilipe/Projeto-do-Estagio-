import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
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
  imports: [CommonModule, FormsModule, RouterModule],
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
  mode: 'login' | 'register' | 'recovery' = 'login';
  
  // Loading states per mode
  isLoggingIn = false;
  isRegistering = false;
  isRecovering = false;

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
  ) { }

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(params => {
      if (params['mode'] === 'register') {
        this.mode = 'register';
      }
    });

    const savedEmail = localStorage.getItem('last_logged_email');
    if (savedEmail) {
      this.loginEmail = savedEmail;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setMode(newMode: 'login' | 'register' | 'recovery'): void {
    this.mode = newMode;
    this.resetStates();
  }

  private resetStates(): void {
    this.isLoggingIn = false;
    this.isRegistering = false;
    this.isRecovering = false;
    this.error = '';
    this.success = '';
  }

  toggleForm(): void {
    this.setMode(this.mode === 'register' ? 'login' : 'register');
  }

  submit(): void {
    if (this.mode === 'register') {
      this.register();
    } else if (this.mode === 'recovery') {
      this.recoverPassword();
    } else {
      this.login();
    }
  }

  async login() {
    if (!this.loginEmail || !this.loginPassword) {
      this.error = 'Preencha todos os campos';
      return;
    }

    this.isLoggingIn = true;
    this.error = '';

    try {
      await this.authService.signIn(this.loginEmail, this.loginPassword);
      this.success = 'Bem-vindo de volta!';
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/cliente/dashboard';
      setTimeout(() => this.router.navigateByUrl(returnUrl), 800);
    } catch (err: any) {
      console.error('[Login] Erro ao entrar:', err);
      this.error = err.message || 'Erro ao entrar. Tenta novamente.';

    } finally {
      this.isLoggingIn = false;
    }
  }

  async register() {
    if (!this.registerEmail || !this.registerPassword || !this.registerName) {
      this.error = 'Preencha todos os campos';
      return;
    }

    if (this.registerPassword.length < 6) {
      this.error = 'A palavra-passe deve ter pelo menos 6 caracteres.';
      return;
    }

    this.isRegistering = true;
    this.error = '';

    try {
      await this.authService.signUp(this.registerEmail, this.registerPassword, this.registerName);
      this.success = 'Conta criada com sucesso! Bem-vindo!';
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/cliente/dashboard';
      setTimeout(() => this.router.navigateByUrl(returnUrl), 800);
    } catch (err: any) {
      console.error('[Login] Erro ao criar conta:', err);
      this.error = err.message || 'Erro ao criar conta. Tenta novamente.';

    } finally {
      this.isRegistering = false;
    }
  }

  async loginWithGoogle() {
    try {
      this.isLoggingIn = true; // Use loggingIn state for google too
      this.error = '';
      await this.authService.signInWithGoogle();
      this.success = 'Login efetuado com sucesso!';
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/cliente/dashboard';
      setTimeout(() => this.router.navigateByUrl(returnUrl), 800);
    } catch (err: any) {
      console.error('[Login] Erro Google:', err);
      this.error = err.message || 'Erro ao entrar com Google.';

    } finally {
      this.isLoggingIn = false;
    }
  }

  async recoverPassword() {
    if (!this.loginEmail) {
      this.error = 'Por favor, introduza o seu email.';
      return;
    }

    this.isRecovering = true;
    this.error = '';

    try {
      await this.authService.resetPassword(this.loginEmail);
      this.success = 'Enviámos um link de recuperação para o seu email.';
      setTimeout(() => this.setMode('login'), 3000);
    } catch (err: any) {
      console.error('[Login] Erro recuperação:', err);
      this.error = err.message || 'Erro ao enviar email de recuperação.';

    } finally {
      this.isRecovering = false;
    }
  }
}
