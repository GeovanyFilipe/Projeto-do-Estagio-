# 📋 GUIA DE BOAS PRÁTICAS - RxJS & Memory Leaks

**Objetivo**: Manter a qualidade do código e evitar memory leaks

---

## 🔄 Padrão Obrigatório para Todos os Componentes

Qualquer componente que use `subscribe()` **DEVE** seguir este padrão:

### ✅ PADRÃO CORRETO

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MyService } from './my.service';

@Component({
  selector: 'app-my',
  standalone: true,
  imports: [],
  templateUrl: './my.component.html',
  styleUrls: ['./my.component.css']
})
export class MyComponent implements OnInit, OnDestroy {
  
  // ✅ 1. Usar Subject para cleanup
  private destroy$ = new Subject<void>();

  constructor(private myService: MyService) {}

  ngOnInit(): void {
    // ✅ 2. Sempre usar takeUntil(this.destroy$)
    this.myService.getData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        // Lógica
      });

    // Se tiver múltiplas subscriptions
    this.myService.getUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        // Lógica
      });
  }

  // ✅ 3. Implementar ngOnDestroy
  ngOnDestroy(): void {
    this.destroy$.next();    // Emite valor para ativar takeUntil
    this.destroy$.complete(); // Completa o Subject
  }
}
```

---

## ❌ PADRÕES PROIBIDOS

### ❌ NÃO FAZER: Subscribe sem unsubscribe

```typescript
// ❌ ERRADO
this.myService.getData().subscribe(data => {
  // Sem takeUntil = memory leak
});
```

### ❌ NÃO FAZER: Implementar OnInit mas não OnDestroy

```typescript
// ❌ ERRADO
export class MyComponent implements OnInit {
  // Se adicionar subscribe, será memory leak
  ngOnInit(): void { }
  // Falta ngOnDestroy
}
```

### ❌ NÃO FAZER: Manual unsubscribe em ngOnDestroy

```typescript
// ❌ NÃO RECOMENDADO (muito boilerplate)
export class MyComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  ngOnInit(): void {
    const sub = this.myService.getData().subscribe(...);
    this.subscriptions.add(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); // Funciona mas é verbose
  }
}
```

---

## 📝 CHECKLIST: Antes de fazer Push

- [ ] Todos componentes com `subscribe()` implementam `OnDestroy`?
- [ ] Todas subscriptions usam `takeUntil(this.destroy$)`?
- [ ] Existe `private destroy$ = new Subject<void>()`?
- [ ] `ngOnDestroy()` chama `destroy$.next()` e `destroy$.complete()`?
- [ ] Z-index usa apenas valores permitidos (100, 150, 1000, 1001, 2000)?
- [ ] Modais têm `position: fixed` e `z-index: var(--z-overlay-backdrop)`?
- [ ] Navbars têm `position: sticky/fixed` e `z-index: var(--z-sticky)`?

---

## 🔍 Como Verificar Memory Leaks

### 1. No Browser DevTools

1. Abrir **Chrome DevTools** → **Memory**
2. Tomar **Heap Snapshot** inicial
3. Navegar entre componentes 5-10 vezes
4. Tomar outro **Heap Snapshot**
5. Procurar por **"detached"** nodes - se crescer, há memory leak

### 2. No Código

Procurar por estes padrões perigosos:

```bash
# Procurar subscriptions sem takeUntil
grep -r "\.subscribe({" src/app --include="*.ts"

# Procurar componentes sem OnDestroy
grep -r "implements OnInit" src/app --include="*.ts" | grep -v OnDestroy
```

---

## 🛠️ Refatoração Rápida

Se encontrar um componente com erro:

```typescript
// ANTES (com erro)
@Component({...})
export class OldComponent implements OnInit {
  constructor(private service: MyService) {}
  
  ngOnInit(): void {
    this.service.getData().subscribe(data => {...});
  }
}

// DEPOIS (corrigido)
@Component({...})
export class OldComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  constructor(private service: MyService) {}
  
  ngOnInit(): void {
    this.service.getData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {...});
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

**3 mudanças apenas**:
1. Adicionar `OnDestroy` no `implements`
2. Adicionar `private destroy$` com `new Subject<void>()`
3. Adicionar `ngOnDestroy()` com a lógica de cleanup
4. Adicionar `.pipe(takeUntil(this.destroy$))` antes de `.subscribe()`

---

## 📊 Hierarquia de Z-Index (Obrigatória)

```css
/* Use SEMPRE as variáveis do ficheiro z-index-variables.css */

/* Base */
z-index: 1;

/* Sticky/Elevated */
z-index: 100;     /* Navbars sticky */
z-index: 150;     /* Dropdowns */
z-index: 99;      /* Mobile menus */

/* Overlays & Modals */
z-index: 1000;    /* Backdrop/overlay */
z-index: 1001;    /* Modal conteúdo */

/* Top-level */
z-index: 2000;    /* Notificações/Toast */
z-index: 2001;    /* Modais críticas */
```

**NUNCA usar valores como 9999, 10000, etc!** Usar a hierarquia definida.

---

## 🚀 Melhorias Futuras

1. **Adicionar ESLint rule** para alertar sobre `subscribe()` sem `takeUntil`
2. **Adicionar testes** para verificar unsubscribe em `ngOnDestroy`
3. **Criar snippet** no VS Code com o padrão correto
4. **Documentar** em arquivo CONTRIBUTING.md

---

## 📞 Dúvidas Frequentes

### P: E se o serviço retorna um Observable singleton?
R: Ainda deve usar `takeUntil()`. O padrão protege contra múltiplas subscrições acidentais.

### P: Que tal usar `async` pipe no template?
R: Excelente! Usar `{{ data$ | async }}` no HTML **elimina** a necessidade de subscribe manualmente.

```typescript
// ✅ IDEAL: Sem subscribe manual
export class MyComponent {
  data$ = this.myService.getData();
  constructor(private myService: MyService) {}
  // Sem ngOnDestroy necessário!
}
```

### P: Que tal HttpClient requests?
R: HttpClient Observables são **complete()** automaticamente após retornar, mas ainda é boa prática usar `takeUntil()`.

```typescript
this.http.get('/api/data')
  .pipe(takeUntil(this.destroy$))
  .subscribe(...);
```

---

## ✅ Verificação Final

Executar antes de cada commit:

```bash
# 1. Procurar por subscribe sem takeUntil
grep -r "\.subscribe" src/app --include="*.ts" | grep -v "takeUntil" | wc -l
# Deve retornar 0

# 2. Procurar por OnInit sem OnDestroy
grep -r "implements OnInit" src/app --include="*.ts" | grep -v "OnDestroy" | wc -l
# Pode retornar 0 (componentes sem subscribe são OK)

# 3. Build do projeto
ng build --configuration production
# Sem erros?
```

