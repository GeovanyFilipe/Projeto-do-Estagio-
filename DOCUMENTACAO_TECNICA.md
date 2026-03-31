# 🔧 Documentação Técnica - Componentes

## Menu Component (`menu.component.*`)

### Imports
```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
```

### Propriedades
```typescript
isMobileMenuOpen: boolean = false;
activeDropdown: string | null = null;
```

### Métodos
- `toggleMobileMenu()` - Abre/fecha menu mobile
- `closeMobileMenu()` - Força fechamento do menu
- `openDropdown(dropdown: string)` - Abre dropdown específico
- `closeDropdown(dropdown: string)` - Fecha dropdown

### Events
```html
(mouseenter)="openDropdown('planos')"
(mouseleave)="closeDropdown('planos')"
(click)="toggleMobileMenu()"
```

### CSS Classes
- `.navbar-container` - Wrapper principal
- `.navbar-menu.mobile-open` - Menu aberto em mobile
- `.dropdown-menu.show` - Dropdown visível
- `.mobile-toggle.active` - Hamburger ativo

---

## Specs Component (`specs.component.*`)

### Cards Inclusos
1. **Conteúdo Premium sem Interrupções**
   - YouTube sem anúncios
   - HD 1080p
   - Streaming contínuo

2. **Baixa Latência para Conexões Críticas**
   - Portais governamentais
   - Latência mínima
   - Conexão otimizada

3. **Segurança Avançada**
   - Criptografia AES-256
   - Anonimato total
   - Sem registos

### Estrutura HTML
```html
<section class="specs-container">
  <div class="spec-card">
    <div class="card-icon"><!-- SVG --></div>
    <h3>Título</h3>
    <p>Descrição</p>
    <ul class="features-list">
      <li>Feature 1</li>
    </ul>
  </div>
</section>
```

### CSS Grid
- Desktop: 3 colunas
- Tablet: 2 colunas
- Mobile: 1 coluna
- Gap: 30px

---

## Rodape Component (`rodape.component.*`)

### Estrutura
```
Header: Logo + Descrição + Social
├── Coluna 1: Brand (2fr)
├── Coluna 2: Links Rápidos (1fr)
├── Coluna 3: Suporte (1fr)
└── Coluna 4: Legal (1fr)

Footer: Copyright + Métodos de Pagamento
```

### Social Icons
- Facebook
- Twitter
- Instagram
- Whatsapp

### Métodos de Pagamento
- 💳 Cartão
- 📱 MobileMoneyAO
- 🏦 Transferência

---

## Rotas Principais

### App Routes (`app.routes.ts`)
```typescript
const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'porque', loadComponent: () => import('.../porque.component').then(m => m.PorqueComponent) },
  { path: 'planos', loadComponent: () => import('.../planos.component').then(m => m.PlanosComponent) },
  { path: 'planos/youtube', loadComponent: () => import('.../youtube.component').then(m => m.YoutubeComponent) },
  { path: 'planos/gobierno', loadComponent: () => import('.../gobierno.component').then(m => m.GobiernoComponent) },
  { path: 'download', loadComponent: () => import('.../download.component').then(m => m.DownloadComponent) },
  { path: 'empresas', loadComponent: () => import('.../empresas.component').then(m => m.EmpresasComponent) },
  { path: 'suporte/tecnico', loadComponent: () => import('.../tecnico.component').then(m => m.TecnicoComponent) },
  { path: 'suporte/comercial', loadComponent: () => import('.../comercial.component').then(m => m.ComercialComponent) },
  { path: 'admin', loadComponent: () => import('.../painel.component').then(m => m.PainelComponent) },
];
```

### Lazy Loading
- Todos os componentes usam `loadComponent()`
- Carregamento sob demanda
- Melhor performance inicial

---

## Components Detalhados

### PorqueComponent
**Props:** `razoes: Array`
- Lê do component
- Renderiza dinamicamente
- 4 razões principais

### PlanosComponent
**Props:** `planos: Array`
```typescript
{
  titulo: string;
  preco: number;
  descricao: string;
  features: string[];
  cta: string;
  rota: string;
  destaque?: boolean;
}
```

### YoutubeComponent
**Features:**
- YouTube Premium
- Sem anúncios
- HD 1080p
- Reprodução offline
- Síntese de fala

### GobiernoComponent
**Features:**
- Acesso .GOV.AO
- IP Premium
- Velocidade priorizada
- Suporte dedicado
- Uptime 99.9%

### DownloadComponent
**Plataformas:**
1. Windows
2. macOS
3. Linux
4. iOS
5. Android

### EmpresasComponent
**Benefícios:**
1. Múltiplas Licenças
2. Gerenciamento Centralizado
3. Relatórios Detalhados
4. Segurança Avançada

### TecnicoComponent
**Seções:**
- FAQ (3 itens)
- Chat ao Vivo 24/7
- Email de suporte

### ComercialComponent
**Seções:**
- Horários de atendimento
- Telefone/Whatsapp
- Formulário de contato
- Email commercial

### PainelComponent
**Cards:**
1. Minha Assinatura
2. Meus Dispositivos
3. Faturamento
4. Configurações

---

## Estilos Globais

### Gradientes Principais
```css
/* Hero/Primary */
background: linear-gradient(135deg, #1e3a5f 0%, #2d5a8c 100%);

/* Accent */
background: linear-gradient(135deg, #00d4ff 0%, #0099ff 100%);

/* Light Background */
background: linear-gradient(135deg, #f5f7fa 0%, #e9f0f7 100%);

/* Dark Background */
background: linear-gradient(135deg, #0f1419 0%, #1e3a5f 50%, #0f1419 100%);
```

### Transições
```css
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

### Sombras
```css
/* Small */
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

/* Medium */
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);

/* Large */
box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);

/* Glow Accent */
box-shadow: 0 8px 20px rgba(0, 153, 255, 0.3);
```

---

## Tipografia

### Headings
```css
h1 { font-size: 48px; font-weight: 700; }
h2 { font-size: 42px; font-weight: 700; }
h3 { font-size: 22px; font-weight: 700; }
h4 { font-size: 18px; font-weight: 600; }
```

### Corpo
```css
p { font-size: 15-16px; font-weight: 400; line-height: 1.6; }
a { font-size: 14px; font-weight: 600; }
```

---

## Responsive Breakpoints

```css
/* Desktop */
@media (min-width: 1025px) {
  /* 3 colunas, features completas */
}

/* Tablet */
@media (max-width: 1024px) {
  grid-template-columns: 1fr 1fr;
}

/* Mobile */
@media (max-width: 768px) {
  grid-template-columns: 1fr;
  /* hambuger menu */
}

/* Small Mobile */
@media (max-width: 480px) {
  /* ajustes adicionais */
  font-size reduzido;
}
```

---

## Performance Tips

### 1. Lazy Loading Routes
✅ Implementado: `loadComponent()`

### 2. OnPush Change Detection
```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
```
**Status:** Não implementado (melhorar performance)

### 3. TrackBy em *ngFor
```html
<div *ngFor="let item of items; trackBy: trackByFn">
```
**Status:** Não implementado

### 4. Defer Loading (Angular 15+)
```html
@defer (on viewport) {
  <app-heavy-component />
}
```
**Status:** Não implementado

---

## Acessibilidade

### Implementado
- ✅ Semântica HTML5
- ✅ Contraste WCAG AA
- ✅ Hover visível
- ✅ Form labels
- ✅ Alt text em imagens

### Não Implementado
- [ ] ARIA roles completos
- [ ] Keyboard navigation
- [ ] Skip links
- [ ] Focus management
- [ ] Screen reader testing

---

## SEO

### Implementado
- ✅ Semantic HTML
- ✅ Meta tags (title, description)
- ✅ Structured data ready
- ✅ Fast loading
- ✅ Mobile friendly

### Não Implementado
- [ ] Sitemap
- [ ] Robots.txt
- [ ] Static pre-rendering
- [ ] Schema markup
- [ ] Open Graph tags

---

## Testing

### Unit Tests (Não Implementado)
```typescript
describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle mobile menu', () => {
    component.toggleMobileMenu();
    expect(component.isMobileMenuOpen).toBeTruthy();
  });
});
```

### E2E Tests (Não Implementado)
```typescript
describe('Navigation', () => {
  it('should navigate to planos page', () => {
    cy.visit('/');
    cy.contains('Planos').click();
    cy.url().should('include', '/planos');
  });
});
```

---

## Integração com Backend

### Endpoints Necessários
```
POST   /api/auth/login
POST   /api/auth/register
GET    /api/planos
POST   /api/contratos
GET    /api/usuario/assinatura
GET    /api/suporte/tickets
POST   /api/suporte/novo-ticket
```

### Interceptors (Não Implementado)
```typescript
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }
    return next.handle(req);
  }
}
```

---

## Configuração HTTP (Não Implementado)

```typescript
// app.config.ts
import { provideHttpClient, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
  ]
};
```

---

## Variáveis de Ambiente

### .env (Criar)
```
NG_APP_API_URL=https://api.angolanovpn.ao
NG_APP_ENV=production
NG_APP_VERSION=1.0.0
```

### Usar em Component
```typescript
const apiUrl = process.env['NG_APP_API_URL'];
```

---

## Checklist de Produção

- [ ] Build otimizado
- [ ] SSR configurado
- [ ] CDN setup (imagens)
- [ ] Cache headers
- [ ] Gzip compression
- [ ] Minify HTML/CSS/JS
- [ ] Tree shaking ativo
- [ ] Source maps removidos
- [ ] Environment variables
- [ ] HTTPS certificate
- [ ] Monitoring setup
- [ ] Error tracking
- [ ] Analytics
- [ ] Backup strategy

---

## Contato para Suporte

- 📧 dev@angolanovpn.ao
- 💻 GitHub: [repo-link]
- 📞 +244 931 234 567
- 💬 https://support.angolanovpn.ao

---

**Última atualização:** 31/03/2026
**Versão:** 2.0 (Reformulação Completa)
