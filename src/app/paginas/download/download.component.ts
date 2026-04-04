import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../layout/menu/menu.component';
<<<<<<< HEAD
=======
import { RodapeComponent } from '../../layout/rodape/rodape.component';
>>>>>>> HiddenCode

@Component({
  selector: 'app-download',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule, MenuComponent ],
=======
  imports: [CommonModule, MenuComponent,RodapeComponent],
>>>>>>> HiddenCode
  templateUrl: './download.component.html',
  styleUrl: './download.component.css'
})
export class DownloadComponent {
  downloadApp(plataforma: string) {
    const urlMap: { [key: string]: string } = {
      windows: 'https://example.com/download/windows',
      macos: 'https://example.com/download/macos',
      linux: 'https://example.com/download/linux',
      ios: 'https://example.com/download/ios',
      android: 'https://example.com/download/android'
    };

    const targetUrl = urlMap[plataforma] || 'https://example.com/download';
    window.open(targetUrl, '_blank');
  }
}

