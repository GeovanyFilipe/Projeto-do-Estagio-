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
  ) { }

  ngOnInit(): void {
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
      await this.authService.signIn(this.loginEmail, this.loginPassword);
      this.success = 'Bem-vindo de volta!';
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/cliente/dashboard';
      setTimeout(() => this.router.navigateByUrl(returnUrl), 800);
    } catch (err: any) {
      this.error = err.message || 'Erro ao entrar. Tenta novamente.';
    } finally {
      this.loading = false;
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

    this.loading = true;
    this.error = '';

    try {
      await this.authService.signUp(this.registerEmail, this.registerPassword, this.registerName);
      this.success = 'Conta criada com sucesso! Bem-vindo!';
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/cliente/dashboard';
      setTimeout(() => this.router.navigateByUrl(returnUrl), 800);
    } catch (err: any) {
      this.error = err.message || 'Erro ao criar conta. Tenta novamente.';
    } finally {
      this.loading = false;
    }
  }

  async loginWithGoogle() {
    try {
      this.loading = true;
      this.error = '';
      await this.authService.signInWithGoogle();
      this.success = 'Login efetuado com sucesso!';
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/cliente/dashboard';
      setTimeout(() => this.router.navigateByUrl(returnUrl), 800);
    } catch (err: any) {
      this.error = err.message || 'Erro ao entrar com Google.';
    } finally {
      this.loading = false;
    }
  }

  private mapError(code: string): string {
    switch (code) {
      case 'auth/user-not-found': return 'Utilizador não encontrado.';
      case 'auth/wrong-password': return 'Senha incorreta.';
      case 'auth/invalid-credential': return 'Email ou senha incorretos.';
      case 'auth/email-already-in-use': return 'Este email já está em uso.';
      case 'auth/weak-password': return 'A senha deve ter pelo menos 6 caracteres.';
      case 'auth/invalid-email': return 'O formato do email é inválido.';
      case 'auth/popup-closed-by-user': return 'A janela foi fechada antes de concluir o login.';
      case 'auth/cancelled-by-user': return 'Operação cancelada.';
      case 'auth/operation-not-allowed': return 'Este método de login não está ativo.';
      case 'auth/popup-blocked': return 'O seu navegador bloqueou a janela de popup.';
      default:
        if (code?.includes('network-request-failed')) return 'Erro de rede. Verifique sua conexão.';
        return 'Ocorreu um erro ao processar o login. Por favor, tente novamente.';
    }
  }
}