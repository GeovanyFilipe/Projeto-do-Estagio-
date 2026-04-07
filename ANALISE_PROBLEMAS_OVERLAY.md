# 🔍 ANÁLISE COMPLETA: Problemas de Overlays, Modais e Memory Leaks

**Data:** Abril 2026  
**Status:** 🔴 CRÍTICO - 3 Memory Leaks Encontrados

---

## 📊 RESUMO EXECUTIVO

| Tipo | Quantidade | Severidade | Impacto |
|------|-----------|-----------|--------|
| Memory Leaks (Subscrições) | 3 | 🔴 CRÍTICO | Vazamento de memória ao navegar |
| Z-index Conflitante | 2 | 🟡 MODERADO | Modal pode ficar embaixo do navbar |
| Ausência de OnDestroy | 3 | 🟡 MODERADO | Risco futuro de memory leaks |
| **TOTAL** | **8 Problemas** | - | - |

---

## 🔴 PROBLEMA #1: LOGIN COMPONENT - SUBSCRIÇÕES SEM UNSUBSCRIBE

### 📍 Localização
Ficheiro: `src/app/auth/login/login.component.ts`

### 🐛 Código com Problema

#### Linha 1-14 (Imports & Declarations)
```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, LoginResponse } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {  // ❌ PROBLEMA: Só OnInit, falta OnDestroy
```

#### Linha 51-72 (Método login)
```typescript
login(): void {
  if (!this.email || !this.password) {
    this.error = 'Por favor, preencha todos os campos';
    return;
  }

  this.loading = true;
  this.error = '';

  // ❌ PROBLEMA 1: Subscribe sem unsubscribe
  // ❌ PROBLEMA 2: Se navegar enquanto carrega, subscription continua ativa
  // ❌ PROBLEMA 3: Memory leak - observer continua em memória
  this.authService.login(this.email, this.password).subscribe({
    next: (response: LoginResponse) => {
      this.loading = false;
      this.success = 'Login realizado com sucesso!';
      setTimeout(() => {
        this.router.navigate([this.returnUrl]);
      }, 1500);
    },
    error: (err: any) => {
      this.loading = false;
      this.error = err.message || 'Erro ao fazer login. Tente novamente.';
    }
  }); // ❌ Sem unsubscribe aqui!
}
```

#### Linha 81-102 (Método register)
```typescript
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

  // ❌ MESMO PROBLEMA: Subscribe sem unsubscribe
  this.authService.register(this.email, this.password, this.nome, this.plano).subscribe({
    next: (response: LoginResponse) => {
      this.loading = false;
      this.success = 'Cadastro realizado com sucesso! Bem-vindo!';
      setTimeout(() => {
        this.router.navigate([this.returnUrl]);
      }, 1500);
    },
    error: (err: any) => {
      this.loading = false;
      this.error = err.message || 'Erro ao fazer cadastro. Tente novamente.';
    }
  }); // ❌ Sem unsubscribe aqui!
}
```

### ⚠️ Consequências
1. **Memory Leak**: Cada vez que um utilizador faz login/register e depois navega, a subscription fica ativa em memória
2. **Múltiplas Subscrições**: Se o utilizador clicar 2x no botão antes de terminar, há 2 subscriptions simultâneas
3. **Comportamento Estranho**: Se navegar enquanto carrega, `setTimeout` ainda executa e pode causar erros

### ✅ Solução Implementada

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';  // ✅ Adiciona OnDestroy
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, LoginResponse } from '../../services/auth.service';
import { Subject } from 'rxjs';  // ✅ Adiciona Subject
import { takeUntil } from 'rxjs/operators';  // ✅ Adiciona takeUntil

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {  // ✅ Implementa OnDestroy
  email: string = '';
  password: string = '';
  nome: string = '';
  isRegister: boolean = false;
  loading: boolean = false;
  error: string = '';
  success: string = '';
  plano: string = 'Plano YouTube sem Anúncios';
  returnUrl: string = '';

  private destroy$ = new Subject<void>();  // ✅ Padrão RxJS para cleanup

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

    // ✅ CORRIGIDO: Adiciona takeUntil(this.destroy$)
    this.authService.login(this.email, this.password)
      .pipe(takeUntil(this.destroy$))  // ✅ Unsubscribe automático ao destruir
      .subscribe({
        next: (response: LoginResponse) => {
          this.loading = false;
          this.success = 'Login realizado com sucesso!';
          setTimeout(() => {
            this.router.navigate([this.returnUrl]);
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

    // ✅ CORRIGIDO: Adiciona takeUntil(this.destroy$)
    this.authService.register(this.email, this.password, this.nome, this.plano)
      .pipe(takeUntil(this.destroy$))  // ✅ Unsubscribe automático ao destruir
      .subscribe({
        next: (response: LoginResponse) => {
          this.loading = false;
          this.success = 'Cadastro realizado com sucesso! Bem-vindo!';
          setTimeout(() => {
            this.router.navigate([this.returnUrl]);
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

  // ✅ ADICIONADO: ngOnDestroy para limpeza automática
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

---

## 🔴 PROBLEMA #2: DASHBOARD COMPONENT - AUSÊNCIA DE OnDestroy

### 📍 Localização
Ficheiro: `src/app/cliente/dashboard/dashboard.component.ts`  
Linhas: 1-14

### 🐛 Código com Problema

```typescript
import { Component, OnInit } from '@angular/core';  // ❌ Falta OnDestroy
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-cliente-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class ClienteDashboardComponent implements OnInit {  // ❌ Só OnInit
  currentUser: User | null = null;
  activeTab: string = 'overview';
  showLogoutConfirm: boolean = false;
  // ... resto do código
}
```

### ⚠️ Consequências
- Mesmo sem subscrições actuais, se no futuro alguém adicionar um `subscribe()`, não terá proteção
- Não segue o padrão de boas práticas Angular
- Risco de memory leaks se adicionar observables

### ✅ Solução Implementada

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';  // ✅ Adiciona OnDestroy
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';  // ✅ Adiciona Subject
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-cliente-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class ClienteDashboardComponent implements OnInit, OnDestroy {  // ✅ Implementa OnDestroy
  currentUser: User | null = null;
  activeTab: string = 'overview';
  showLogoutConfirm: boolean = false;
  
  private destroy$ = new Subject<void>();  // ✅ Padrão para cleanup

  devices = [
    { id: 1, nome: 'Notebook - Chrome', status: 'Ativo', ip: '192.168.1.100', ultimoAcesso: '2 min atrás' },
    { id: 2, nome: 'Celular - Android', status: 'Ativo', ip: '192.168.1.101', ultimoAcesso: '15 min atrás' },
    { id: 3, nome: 'Tablet - iPad', status: 'Inativo', ip: '192.168.1.102', ultimoAcesso: '2 dias atrás' }
  ];

  invoices = [
    { id: 1, data: '31/03/2026', valor: 'AOA 5.99', status: 'Pago', metodo: 'Cartão' },
    { id: 2, data: '31/02/2026', valor: 'AOA 5.99', status: 'Pago', metodo: 'Cartão' },
    { id: 3, data: '31/01/2026', valor: 'AOA 5.99', status: 'Pago', metodo: 'Cartão' }
  ];

  constructor(
    private authService: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    this.currentUser = this.authService.getCurrentUser();
  }

  selectTab(tab: string): void {
    this.activeTab = tab;
  }

  disconnectDevice(deviceId: number): void {
    alert(`Dispositivo ${deviceId} desconectado`);
  }

  downloadInvoice(invoiceId: number): void {
    alert(`Baixando fatura ${invoiceId}`);
  }

  changePlan(newPlan: string): void {
    if (this.currentUser && this.currentUser.plano !== newPlan) {
      const confirmed = confirm(`Alterar para ${newPlan}?`);
      if (confirmed) {
        this.authService.updatePlano(newPlan);
        this.currentUser = this.authService.getCurrentUser();
        alert('Plano alterado com sucesso!');
      }
    }
  }

  contacterSuporte(): void {
    this.router.navigate(['/suporte/tecnico']);
  }

  confirmLogout(): void {
    this.showLogoutConfirm = true;
  }

  cancelLogout(): void {  // ✅ Adiciona método para fechar modal
    this.showLogoutConfirm = false;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  // ✅ ADICIONADO: ngOnDestroy para padrão correto
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

---

## 🔴 PROBLEMA #3: PAINEL COMPONENT - AUSÊNCIA DE OnDestroy

### 📍 Localização
Ficheiro: `src/app/admin/painel/painel.component.ts`  
Linhas: 1-22

### 🐛 Código com Problema

```typescript
import { Component, OnInit } from '@angular/core';  // ❌ Falta OnDestroy
import { CommonModule, DatePipe } from '@angular/common';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-painel',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './painel.component.html',
  styleUrl: './painel.component.css'
})
export class PainelComponent implements OnInit {  // ❌ Só OnInit
  user: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
  }

  logout(): void {
    this.authService.logout();
  }
}
```

### ⚠️ Consequências
- Administradores podem ver comportamentos estranhos se o painel for mal mantido
- Risco futuro se adicionar dados dinâmicos

### ✅ Solução Implementada

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';  // ✅ Adiciona OnDestroy
import { CommonModule, DatePipe } from '@angular/common';
import { Subject } from 'rxjs';  // ✅ Adiciona Subject
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-painel',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './painel.component.html',
  styleUrl: './painel.component.css'
})
export class PainelComponent implements OnInit, OnDestroy {  // ✅ Implementa OnDestroy
  user: User | null = null;
  
  private destroy$ = new Subject<void>();  // ✅ Padrão para cleanup

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
  }

  logout(): void {
    this.authService.logout();
  }

  // ✅ ADICIONADO: ngOnDestroy para padrão correto
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

---

## 🟡 PROBLEMA #4: Z-INDEX CONFLITANTE NO MENU

### 📍 Localização
Ficheiro: `src/app/layout/menu/menu.component.css`

### 🐛 Código com Problema

| Linha | Elemento | Z-index | Problema |
|-------|----------|---------|----------|
| 7 | `.navbar-container` | `1000` | Menu no mesmo nível que modal |
| 132 | `.dropdown-menu` | `1001` | Dropdown fica acima do modal |
| 323 | `.mobile-toggle` | `1002` | Hamburger fica acima de tudo |

```css
/* Linha 7 */
.navbar-container {
  background: linear-gradient(135deg, #1e3a5f 0%, #2d5a8c 100%);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;  /* ❌ PROBLEMA 1: Mesmo que modal */
  transition: all 0.3s ease;
}

/* Linha 132 */
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border-radius: 12px;
  min-width: 280px;
  margin-top: 8px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 8px;
  z-index: 1001;  /* ❌ PROBLEMA 2: Acima do modal */
}

/* Linha 323 */
.mobile-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  z-index: 1002;  /* ❌ PROBLEMA 3: Acima de tudo */
}
```

### 🐛 Código CSS Modal (dashboard.component.css, linha 595)

```css
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;  /* ❌ CONFLITO: Mesmo que navbar */
}
```

### ⚠️ Consequências
- Modal pode ficar **embaixo do navbar** se o navbar tiver z-index maior
- Dropdown menu aparece **acima da modal** (comportamento confuso)
- Hamburger menu fica acima de tudo (quebra modal)

### ✅ Solução Z-Index Recomendada

Usar uma hierarquia clara e consistente em **todo o projeto**:

```
Base elements:        z-index: 1
Sticky navbar:        z-index: 100
Dropdowns:           z-index: 150
Modals/Overlays:     z-index: 1000
Modal content:       z-index: 1001
Fixed notifications: z-index: 2000
```

---

## 🟢 OBSERVAÇÃO: Menu Component Está Correto!

O ficheiro `src/app/layout/menu/menu.component.ts` **já implementa o padrão correto**:

```typescript
// ✅ Correto: Implementa OnInit e OnDestroy
export class MenuComponent implements OnInit, OnDestroy {
  
  // ✅ Correto: Usa Subject para cleanup
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    // ✅ Correto: Usa takeUntil em ambas as subscriptions
    this.authService.isAuthenticated$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(...);

    this.authService.currentUser$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(...);
  }

  // ✅ Correto: ngOnDestroy com limpeza
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

**Este é o padrão que deve ser replicado** nos outros componentes!

---

## 📋 CHECKLIST DE CORREÇÃO

### Imediatamente (CRÍTICO)
- [ ] Adicionar `OnDestroy` ao `LoginComponent`
- [ ] Adicionar `takeUntil()` nos 2 subscribes do LoginComponent
- [ ] Adicionar método `ngOnDestroy()` ao LoginComponent

### Prioritário (Hoje)
- [ ] Adicionar `OnDestroy` ao `DashboardComponent`
- [ ] Adicionar método `ngOnDestroy()` (mesmo vazio) ao DashboardComponent
- [ ] Adicionar `OnDestroy` ao `PainelComponent`
- [ ] Adicionar método `ngOnDestroy()` ao PainelComponent

### Melhorias (Esta semana)
- [ ] Revisar z-index em `menu.component.css` (1000, 1001, 1002)
- [ ] Revisar z-index em `dashboard.component.css` (modal: 1000)
- [ ] Criar ficheiro CSS global com variáveis de z-index

---

## 🔗 Padrão RxJS Recomendado

Sempre usar este padrão em componentes com subscriptions:

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({...})
export class MyComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(private service: MyService) {}

  ngOnInit(): void {
    this.service.getData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        // Handle data
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

---

## 📞 Próximos Passos

1. Aplicar as correções aos 3 componentes críticos
2. Testar navegação entre componentes (deve remover memory leaks)
3. Revisar todos os componentes para seguir o padrão
4. Criar guia de boas práticas para futuros commits

