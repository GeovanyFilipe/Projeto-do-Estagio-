import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../../layout/menu/menu.component';

@Component({
  selector: 'app-tecnico',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: './tecnico.component.html',
  styleUrl: './tecnico.component.css'
})
export class TecnicoComponent {
  abrirChatAoVivo() {
    const whatsappUrl = 'https://wa.me/244931234567';
    window.open(whatsappUrl, '_blank');
  }
}

