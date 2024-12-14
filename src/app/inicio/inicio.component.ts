import { Component } from '@angular/core';
import { MenuComponent } from '../layout/menu/menu.component';
import { SliderComponent } from '../layout/slider/slider.component';
import { SpecsComponent } from '../layout/specs/specs.component';
import { RodapeComponent } from '../layout/rodape/rodape.component';

@Component({
  selector: 'app-inicio',
  imports: [
    MenuComponent, SliderComponent, SpecsComponent, RodapeComponent
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

}
