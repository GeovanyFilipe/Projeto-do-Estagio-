import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy, inject, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as L from 'leaflet';
import { MenuComponent } from "../../layout/menu/menu.component";
import { RodapeComponent } from '../../layout/rodape/rodape.component';
import { AuthService, AppUser } from '../../services/auth.service';
import { Router } from '@angular/router';
import { logVpnConnection, logVpnDisconnection } from '@dataconnect/generated';
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';


@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [CommonModule, MenuComponent, RodapeComponent],
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map', { static: true }) mapElement!: ElementRef;
  private map!: L.Map;
  private serverMarker!: L.Marker;
  private destroy$ = new Subject<void>();

  isConnected = false;
  showSubscriptionModal = false; // 🔹 Controla exibição do modal de assinatura
  statusText = 'Desprotegido';
  country = 'Angola';
  fakeIp = '102.112.200.178';
  provider = 'AngolanVPN';

  currentUser: AppUser | null = null;
  private currentConnectionLogId: string | null = null;
  private ngZone = inject(NgZone);


  constructor(
    private authService: AuthService,
    private router: Router // 🔹 Injeta Router
  ) {}

  get connectButtonLabel() {
    return this.isConnected ? 'Conectado' : 'Conectar';
  }

  get statusClass() {
    return this.isConnected ? 'status-connected' : 'status-disconnected';
  }

  ngAfterViewInit() {
    if (typeof window === 'undefined') return;

    const angolaBounds = L.latLngBounds(L.latLng(-18.0, 11.0), L.latLng(-4.0, 24.0));

    this.map = L.map(this.mapElement.nativeElement, {
      center: [-12.0, 17.0],
      zoom: 6,
      minZoom: 5,
      maxZoom: 12,
      maxBounds: angolaBounds,
      maxBoundsViscosity: 0.9,
      zoomControl: true,
      attributionControl: true,
      scrollWheelZoom: true,
      dragging: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
      noWrap: true
    }).addTo(this.map);

    this.map.fitBounds(angolaBounds, { padding: [0, 0] });
    this.createCenterMarker();

    setTimeout(() => this.map.invalidateSize(), 100);

    // Subscribes para atualizar usuário logado
    this.currentUser = this.authService.getCurrentUser();
    this.authService.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => this.currentUser = user);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  createCenterMarker() {
    const color = this.isConnected ? '#4ade80' : '#f87171';
    const icon = L.divIcon({
      className: 'angola-server-icon',
      html: `<div class="pulse-dot" style="background:${color}; box-shadow: 0 0 0 0 ${color};"></div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });

    if (this.serverMarker) this.map.removeLayer(this.serverMarker);

    this.serverMarker = L.marker([-12.5, 17.0], { icon })
      .addTo(this.map)
      .bindPopup('Servidor Angola - Ponto Central');
  }

  toggleConnection() {
    if (!this.authService.isAuthenticated()) {
      // 🔹 Redireciona para login e guarda a URL atual
      const currentUrl = window.location.pathname;
      this.router.navigate(['/login'], { queryParams: { returnUrl: currentUrl } });
      return;
    }

    // 🔹 Verifica se o usuário tem um plano assinado
    if (!this.currentUser || this.currentUser.plano === 'Nenhum plano' || !this.currentUser.plano) {
      this.showSubscriptionModal = true;
      return;
    }

    // Usuário logado e com plano → alterna conexão
    this.isConnected = !this.isConnected;
    this.statusText = this.isConnected ? 'Conectado' : 'Desprotegido';
    this.fakeIp = this.isConnected ? '102.223.156.255' : '102.112.200.178';
    this.createCenterMarker();

    // Registo de conexão
    if (this.isConnected && this.currentUser) {
      const userId = this.currentUser.uid;
      this.currentConnectionLogId = crypto.randomUUID();
      const logId = this.currentConnectionLogId;

      this.ngZone.runOutsideAngular(() => {
        const dc = getDataConnect(connectorConfig);
        logVpnConnection(dc, {
          userId: userId,
          serverId: "123e4567-e89b-12d3-a456-426614174000",
          connectTime: new Date().toISOString()
        }).catch((err: any) => {
          const errorMsg = err?.message ? String(err.message) : String(err);
          console.error('Erro ao logar conexão VPN:', errorMsg);
        });
      });
    } else if (!this.isConnected && this.currentConnectionLogId) {
      const logId = this.currentConnectionLogId;
      this.currentConnectionLogId = null;

      this.ngZone.runOutsideAngular(() => {
        const dc = getDataConnect(connectorConfig);
        logVpnDisconnection(dc, {
          id: logId,
          disconnectTime: new Date().toISOString(),
          dataTransferredGB: Math.random() * 2
        }).catch((err: any) => {
          const errorMsg = err?.message ? String(err.message) : String(err);
          console.error('Erro ao logar desconexão VPN:', errorMsg);
        });
      });
    }
  }


  closeSubscriptionModal() {
    this.showSubscriptionModal = false;
  }

  goToPlans() {
    this.router.navigate(['/planos']);
  }
}