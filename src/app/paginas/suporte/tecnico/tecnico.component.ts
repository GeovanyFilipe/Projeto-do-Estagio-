import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../../layout/menu/menu.component';
import { RodapeComponent } from '../../../layout/rodape/rodape.component';

@Component({
  selector: 'app-tecnico',
  standalone: true,
  imports: [CommonModule, MenuComponent,RodapeComponent],
  templateUrl: './tecnico.component.html',
  styleUrl: './tecnico.component.css'
})
export class TecnicoComponent {
  abrirChatAoVivo() {
    const whatsappUrl = 'https://wa.me/244931234567';
    window.open(whatsappUrl, '_blank');
  }
}

