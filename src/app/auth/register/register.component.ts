import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  nome: string = '';
  email: string = '';
  password: string = '';

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
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/cliente/dashboard';

    if (this.authService.isAuthenticated()) {
      this.router.navigate([this.returnUrl]);
    }
  }

  // 📝 REGISTRO (AGORA CONSISTENTE)
  async register(): Promise<void> {
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

    try {
      await this.authService.signUp(this.email, this.password, this.nome);

      this.loading = false;
      this.success = 'Conta criada com sucesso! Bem-vindo!';
      setTimeout(() => this.router.navigateByUrl(this.returnUrl), 1000);

    } catch (err: any) {
      this.loading = false;
      this.error = err?.message || 'Erro ao realizar cadastro.';
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}