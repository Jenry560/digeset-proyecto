import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './header.component.html',
  styles: ``,
})
export class HeaderComponent {
  auth = inject(AuthService);
}