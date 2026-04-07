import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../../layout/menu/menu.component';
import { RodapeComponent } from '../../../layout/rodape/rodape.component';

@Component({
  selector: 'app-gobierno',
  standalone: true,
  imports: [CommonModule, MenuComponent,RodapeComponent],
  templateUrl: './gobierno.component.html',
  styleUrl: './gobierno.component.css'
})
export class GobiernoComponent {}
