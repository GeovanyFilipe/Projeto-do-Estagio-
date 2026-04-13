import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { AuthGuard } from './services/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { ClienteDashboardComponent } from './cliente/dashboard/dashboard.component';
import { TermosComponent } from './layout/rodape/termos.component';
import { PrivacidadeComponent } from './layout/rodape/privacidade.component';
import { CookiesComponent } from './layout/rodape/cookies.component';
import { ProtecaoComponent } from './layout/rodape/protecao.component';


export const routes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'inicio', component: InicioComponent },

    // Autenticação
    { path: 'login', component: LoginComponent },

    // Área do Cliente (protegida)
    { path: 'cliente/dashboard', component: ClienteDashboardComponent, canActivate: [AuthGuard] },

    // Páginas principais
    { path: 'porque', loadComponent: () => import('./paginas/porque/porque.component').then(m => m.PorqueComponent) },
    { path: 'planos', loadComponent: () => import('./paginas/planos/planos.component').then(m => m.PlanosComponent) },
    { path: 'planos/empresarial', loadComponent: () => import('./paginas/planos/empresarial/empresarial.component').then(m => m.EmpresarialComponent) },
    { path: 'planos/individual', loadComponent: () => import('./paginas/planos/individual/individual.component').then(m => m.IndividualComponent) },
    { path: 'planos/educacional', loadComponent: () => import('./paginas/planos/educacional/educacional.component').then(m => m.EducacionalComponent) },
    { path: 'planos/negocio', loadComponent: () => import('./paginas/planos/negocio/negocio.component').then(m => m.NegocioComponent) },
    { path: 'download', loadComponent: () => import('./paginas/download/download.component').then(m => m.DownloadComponent) },
    { path: 'empresas', loadComponent: () => import('./paginas/empresas/empresas.component').then(m => m.EmpresasComponent) },
    { path: 'mapa', loadComponent: () => import('./paginas/mapa/mapa.component').then(m => m.MapaComponent) },
    // Suporte
    { path: 'suporte/tecnico', loadComponent: () => import('./paginas/suporte/tecnico/tecnico.component').then(m => m.TecnicoComponent) },
    { path: 'suporte/comercial', loadComponent: () => import('./paginas/suporte/comercial/comercial.component').then(m => m.ComercialComponent) },
    // Admin
    { path: 'admin', loadComponent: () => import('./admin/painel/painel.component').then(m => m.PainelComponent) },

    { path: 'termos', component: TermosComponent },
    { path: 'privacidade', component: PrivacidadeComponent },
    { path: 'cookies', component: CookiesComponent },
    { path: 'protecao', component: ProtecaoComponent }
];
