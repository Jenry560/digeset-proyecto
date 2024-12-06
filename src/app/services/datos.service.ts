import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';
import { Usuarios } from '../models/Usuario';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
//Metodo global para la configuracion de la grids de la libreria ejs grid
export class DatosService {
  private api = inject(ApiService);
  authService = inject(AuthService);
  endPointUsuarios = 'Usuarios';
  private UsuariosSubject = new BehaviorSubject<Usuarios[]>([]);
  Usuarios = this.UsuariosSubject.asObservable();

  getUsuario() {
    this.api.GetData(this.endPointUsuarios).subscribe((data) => {
      if (data) {
        this.UsuariosSubject.next(data);
      }
    });
  }

  getAllData() {
    if (this.authService.isAdmin()) {
      this.getUsuario();
    }
  }
}
