import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { MenuComponent } from "../../layout/menu/menu.component";
import { RodapeComponent } from '../../layout/rodape/rodape.component';
import { AuthService, User } from '../../services/auth.service';
import { Router } from '@angular/router'; // 🔹 Importa Router

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [CommonModule, MenuComponent, RodapeComponent],
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements AfterViewInit {
  @ViewChild('map', { static: true }) mapElement!: ElementRef;
  private map!: L.Map;
  private serverMarker!: L.Marker;

  isConnected = false;
  statusText = 'Desprotegido';
  country = 'Angola';
  fakeIp = '102.112.200.178';
  provider = 'AngolanVPN';

  currentUser: User | null = null;

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
    this.authService.currentUser$.subscribe(user => this.currentUser = user);
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

    // Usuário logado → alterna conexão
    this.isConnected = !this.isConnected;
    this.statusText = this.isConnected ? 'Conectado' : 'Desprotegido';
    this.fakeIp = this.isConnected ? '102.223.156.255' : '102.112.200.178';
    this.createCenterMarker();
  }
}