import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../layout/menu/menu.component';

@Component({
  selector: 'app-download',
  standalone: true,
  imports: [CommonModule, MenuComponent ],
  templateUrl: './download.component.html',
  styleUrl: './download.component.css'
})
export class DownloadComponent {}
