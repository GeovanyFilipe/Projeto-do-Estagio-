import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../../layout/menu/menu.component';

@Component({
  selector: 'app-gobierno',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: './gobierno.component.html',
  styleUrl: './gobierno.component.css'
})
export class GobiernoComponent {}
