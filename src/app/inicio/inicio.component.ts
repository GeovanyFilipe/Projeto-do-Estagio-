import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../layout/menu/menu.component';
import { SliderComponent } from '../layout/slider/slider.component';
import { SpecsComponent } from '../layout/specs/specs.component';
import { RodapeComponent } from '../layout/rodape/rodape.component';

@Component({
  selector: 'app-inicio',
  imports: [
    MenuComponent,
    SliderComponent,
    SpecsComponent,
    RodapeComponent
  ],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  standalone: true
})
export class InicioComponent implements OnInit {
  slides = [
  '/imagens/pexels-cottonbro-5077064.jpg',
  '/imagens/pexels-ivan-s-8117815.jpg',
  '/imagens/pexels-sanketgraphy-16773547.jpg'
];
  currentSlide = 0;

  ngOnInit(): void {
    this.startSlider();
  }

  startSlider(): void {
    setInterval(() => {
      this.nextSlide();
    }, 5000); // troca a cada 5 segundos
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }
}
