import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AnimationService {
  private platformId = inject(PLATFORM_ID);

  /** Apenas executa no browser (safe para SSR) */
  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  /**
   * Registar plugins GSAP e inicializar efeitos de scroll.
   */
  async initScrollTrigger(): Promise<void> {
    if (!this.isBrowser) return;

    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);
  }

  /**
   * Revelação genérica de página.
   * Identifica elementos comuns e anima a entrada de forma performática.
   */
  async genericPageEntrance(): Promise<void> {
    if (!this.isBrowser) return;

    const { gsap } = await import('gsap');

    // 1. Hero Content (se houver)
    const heroTitle = document.querySelector('.hero h1, .hero-section h1, .hero-title, .login-logo h1');
    const heroContent = document.querySelectorAll(`
      .hero p, .hero-section .hero-subtitle, .hero-subtitle, .hero-buttons, 
      .hero-button, .hero button, .login-box .tabs, .btn-primary, .btn-secondary
    `);
    
    // 2. Grids, Cards e Elementos de Conteúdo
    const revealElements = document.querySelectorAll(`
      .card, .plano-card, .beneficio-card, .featured-card, .download-card, .beneficio-item,
      .faq-item, .contact-section, .form-group, .btn-submit, .btn-google, .divider,
      .faq-section h2, .contact-section h2, .login-box h1, .cta-content h2, .cta-content button
    `);
    
    const tl = gsap.timeline();

    // O título entra de forma impactante
    if (heroTitle) {
      tl.fromTo(heroTitle, 
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
    }

    if (heroContent.length) {
      tl.fromTo(heroContent, 
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', stagger: 0.1 },
        '-=0.3'
      );
    }

    if (revealElements.length) {
      tl.fromTo(revealElements, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.08 },
        '-=0.2'
      );
    }
  }

  /**
   * Animação de entrada do Hero com stagger nos filhos.
   */
  async heroEntrance(selector: string): Promise<void> {
    if (!this.isBrowser) return;
    const { gsap } = await import('gsap');
    const el = document.querySelector(selector);
    if (!el) return;

    const children = el.querySelectorAll('.hero-title, .hero-subtitle, .hero-buttons, h1, p, button');
    gsap.fromTo(children,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.18, delay: 0.15 }
    );
  }

  /**
   * Scroll-reveal: anima elementos ao entrarem na viewport.
   */
  async scrollReveal(selector: string, options?: any): Promise<void> {
    if (!this.isBrowser) return;
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    gsap.fromTo(elements,
      { opacity: 0, y: options?.y ?? 45 },
      {
        opacity: 1,
        y: 0,
        duration: options?.duration ?? 0.75,
        ease: 'power2.out',
        stagger: options?.stagger ?? 0.12,
        scrollTrigger: {
          trigger: elements[0],
          start: options?.start ?? 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  }

  async navbarScroll(selector = '.navbar'): Promise<void> {
    if (!this.isBrowser) return;
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    const navbar = document.querySelector(selector) as HTMLElement | null;
    if (!navbar) return;

    ScrollTrigger.create({
      start: 'top -60px',
      onEnter: () => gsap.to(navbar, { boxShadow: '0 4px 24px rgba(0,0,0,0.45)', backdropFilter: 'blur(10px)', duration: 0.4 }),
      onLeaveBack: () => gsap.to(navbar, { boxShadow: 'none', backdropFilter: 'none', duration: 0.35 }),
    });
  }

  async killAll(): Promise<void> {
    if (!this.isBrowser) return;
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    ScrollTrigger.killAll();
  }
}
