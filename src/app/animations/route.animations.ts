import {
  trigger,
  transition,
  style,
  animate,
  query,
  group,
} from '@angular/animations';

/**
 * Animação de Rota Premium (Overlay)
 * - A página que sai (leave) mantém-se no fundo e encolhe levemente.
 * - A página que entra (enter) surge por cima com fade e slide up.
 */
export const routeAnimation = trigger('routeAnimation', [
  transition('* <=> *', [
    // 1. Definições iniciais: colocar as páginas uma sobre a outra
    style({ position: 'relative', minHeight: '100vh', overflow: 'hidden' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        willChange: 'transform, opacity',
      })
    ], { optional: true }),

    // 2. Estado inicial do componente que entra
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(30px) scale(0.98)', zIndex: 2 })
    ], { optional: true }),

    // 3. Executar animações em paralelo (Group)
    group([
      // Página que SAI: encolhe e desaparece (Z-index menor)
      query(':leave', [
        style({ zIndex: 1 }),
        animate('400ms cubic-bezier(0.4, 0, 0.2, 1)', 
          style({ opacity: 0, transform: 'scale(0.96)' })
        )
      ], { optional: true }),

      // Página que ENTRA: surge por cima
      query(':enter', [
        animate('500ms 50ms cubic-bezier(0.34, 1.56, 0.64, 1)', 
          style({ opacity: 1, transform: 'translateY(0) scale(1)' })
        )
      ], { optional: true }),
    ]),
  ]),
]);
