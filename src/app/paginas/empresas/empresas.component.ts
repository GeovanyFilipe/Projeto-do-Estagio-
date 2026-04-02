import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../layout/menu/menu.component';

@Component({
  selector: 'app-empresas',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: './empresas.component.html',
  styleUrl: './empresas.component.css'
})
export class EmpresasComponent {}
