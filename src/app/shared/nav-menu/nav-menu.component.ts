import { Component, inject, Renderer2 } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-menu.component.html',
  styles: ``,
})
export class NavMenuComponent {
  auth = inject(AuthService);
  renderer = inject(Renderer2);

  closeMenu() {
    if (!document.documentElement.classList.contains('sidebar-enable')) return;
    document.documentElement.classList.remove('sidebar-enable');
    this.hideBackdrop();
  }
  hideBackdrop(): void {
    const backdrop = document.getElementById('custom-backdrop');
    if (backdrop) {
      this.renderer.removeChild(document.body, backdrop);
      this.renderer.removeStyle(document.body, 'overflow');
      this.renderer.removeStyle(document.body, 'paddingRight');
    }
  }
}
