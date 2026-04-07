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
    { path: 'planos/youtube', loadComponent: () => import('./paginas/planos/youtube/youtube.component').then(m => m.YoutubeComponent) },
    { path: 'planos/gobierno', loadComponent: () => import('./paginas/planos/gobierno/gobierno.component').then(m => m.GobiernoComponent) },
    { path: 'download', loadComponent: () => import('./paginas/download/download.component').then(m => m.DownloadComponent) },
    { path: 'empresas', loadComponent: () => import('./paginas/empresas/empresas.component').then(m => m.EmpresasComponent) },
    { path: 'mapa', loadComponent: () => import('./paginas/mapa/mapa.component').then(m => m.MapaComponent) },
    // Suporte
    { path: 'suporte/tecnico', loadComponent: () => import('./paginas/suporte/tecnico/tecnico.component').then(m => m.TecnicoComponent) },
    { path: 'suporte/comercial', loadComponent: () => import('./paginas/suporte/comercial/comercial.component').then(m => m.ComercialComponent) },
    // Admin
    { path: 'admin', loadComponent: () => import('./admin/painel/painel.component').then(m => m.PainelComponent) },
    { path: 'login', component: LoginComponent },
    { path: 'termos', component: TermosComponent },
    { path: 'privacidade', component: PrivacidadeComponent },
    { path: 'cookies', component: CookiesComponent },
    { path: 'protecao', component: ProtecaoComponent }
];
