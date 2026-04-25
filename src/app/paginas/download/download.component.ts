import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../layout/menu/menu.component';
import { RodapeComponent } from '../../layout/rodape/rodape.component';

@Component({
  selector: 'app-download',
  standalone: true,
  imports: [CommonModule, MenuComponent,RodapeComponent],
  templateUrl: './download.component.html',
  styleUrl: './download.component.css'
})
export class DownloadComponent {
  downloadApp(plataforma: string) {
    const urlMap: { [key: string]: string } = {
      windows: 'https://openvpn.net/community-downloads/',
      macos: 'https://tunnelblick.net/category/downloads/',
      linux: 'https://www.wireguard.com/install/',
      android: 'https://play.google.com/store/apps/details?id=net.openvpn.openvpn',
      ios: 'https://apps.apple.com/app/openvpn-connect/id572399834'
    };

    const targetUrl = urlMap[plataforma] || 'https://openvpn.net/community-downloads/';
    window.open(targetUrl, '_blank');
  }
}

