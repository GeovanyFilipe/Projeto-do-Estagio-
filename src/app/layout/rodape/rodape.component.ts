import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // 👈 FALTAVA
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-rodape',
  standalone: true, // 👈 IMPORTANTE (como estás a usar standalone)
  imports: [CommonModule, RouterModule], // 👈 apenas UMA vez
  templateUrl: './rodape.component.html',
  styleUrls: ['./rodape.component.css'] // 👈 corrigi também (era styleUrl)
})
export class RodapeComponent {

}
