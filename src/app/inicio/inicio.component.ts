import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuComponent } from '../layout/menu/menu.component';
import { SliderComponent } from '../layout/slider/slider.component';
import { SpecsComponent } from '../layout/specs/specs.component';
import { RodapeComponent } from '../layout/rodape/rodape.component';

@Component({
  selector: 'app-inicio',
  imports: [
    RouterModule, MenuComponent, SliderComponent, SpecsComponent, RodapeComponent
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

}
