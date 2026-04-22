import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { routeAnimation } from './animations/route.animations';
import { AnimationService } from './services/animation.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [routeAnimation],
})
export class AppComponent implements OnInit {
  title = 'vpn';

  constructor(
    private router: Router,
    private animationService: AnimationService
  ) {}

  ngOnInit() {
    // Escutar mudanças de rota para disparar a revelação GSAP global
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Dispara a revelação imediatamente para evitar atraso percebido no H1
      this.animationService.genericPageEntrance();
    });
  }

  getRouteState(outlet: RouterOutlet): string {
    return outlet.isActivated ? (outlet.activatedRoute.snapshot.url[0]?.path ?? 'home') : '';
  }
}
