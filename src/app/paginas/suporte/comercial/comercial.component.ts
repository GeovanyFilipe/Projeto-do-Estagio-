import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../../layout/menu/menu.component';

@Component({
  selector: 'app-comercial',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: './comercial.component.html',
  styleUrl: './comercial.component.css'
})
export class ComercialComponent {}
