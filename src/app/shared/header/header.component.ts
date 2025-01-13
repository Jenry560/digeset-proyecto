import { Component, inject, Renderer2 } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styles: ``,
})
export class HeaderComponent {
  auth = inject(AuthService);
  renderer = inject(Renderer2);
  config = {
    sidenav: {
      size: 'condensed' // Ajusta el tamaño inicial
    }
  };

  toggleSidenav(): void {
    const e = this.config.sidenav.size;
    const t = document.documentElement.getAttribute('data-sidenav-size');

    if (t === 'full') {
      this.showBackdrop();
    } else if (e === 'fullscreen') {
      if (t === 'fullscreen') {
        this.changeLeftbarSize(e === 'fullscreen' ? 'default' : e, false);
      } else {
        this.changeLeftbarSize('fullscreen', false);
      }
    } else if (t === 'condensed') {
      this.changeLeftbarSize(e === 'condensed' ? 'default' : e, false);
    } else {
      this.changeLeftbarSize('condensed', false);
    }

    document.documentElement.classList.toggle('sidebar-enable');
  }
  showBackdrop(): void {
    const backdrop = this.renderer.createElement('div');
    this.renderer.setAttribute(backdrop, 'id', 'custom-backdrop');
    this.renderer.addClass(backdrop, 'offcanvas-backdrop');
    this.renderer.addClass(backdrop, 'fade');
    this.renderer.addClass(backdrop, 'show');

    this.renderer.appendChild(document.body, backdrop);
    this.renderer.setStyle(document.body, 'overflow', 'hidden');

    if (window.innerWidth > 767) {
      this.renderer.setStyle(document.body, 'paddingRight', '15px');
    }

    backdrop.addEventListener('click', () => {
      document.documentElement.classList.remove('sidebar-enable');
      this.hideBackdrop();
    });
  }
  hideBackdrop(): void {
    const backdrop = document.getElementById('custom-backdrop');
    if (backdrop) {
      this.renderer.removeChild(document.body, backdrop);
      this.renderer.removeStyle(document.body, 'overflow');
      this.renderer.removeStyle(document.body, 'paddingRight');
    }
  }

  changeLeftbarSize(size: string, addClass: boolean): void {
    // Cambiar el tamaño del sidenav
    document.documentElement.setAttribute('data-sidenav-size', size);
  }
}
