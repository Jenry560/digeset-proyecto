import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavMenuComponent } from './shared/nav-menu/nav-menu.component';
import { HeaderComponent } from './shared/header/header.component';
import { DashboardComponent } from './shared/dashboard/dashboard.component';
import { AuthService } from './services/auth.service';
import { DatosService } from './services/datos.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavMenuComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'digeset-proyecto';
  auth = inject(AuthService);
  private datoService = inject(DatosService);

  ngOnInit(): void {
    let dataLocal = this.auth.getDatauUser();
    if (dataLocal) {
      this.auth.tipoLogin = dataLocal.tipo;
      console.log(dataLocal);
      if (this.auth.tipoLogin == 'Agente') {
        this.auth.agenteData = dataLocal.data;
      } else {
        this.auth.usuarioData = dataLocal.data;
      }
      this.datoService.getAllData();
    }
  }
}
