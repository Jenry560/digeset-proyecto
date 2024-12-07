import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';
import { Usuarios } from '../models/Usuario';
import { AuthService } from './auth.service';
import { Concepto } from '../models/Concepto';

@Injectable({
  providedIn: 'root',
})
//Metodo global para la configuracion de la grids de la libreria ejs grid
export class DatosService {
  private api = inject(ApiService);
  authService = inject(AuthService);
  endPointUsuarios = 'Usuarios';
  endPointConceptos = 'Conceptos';
  private UsuariosSubject = new BehaviorSubject<Usuarios[]>([]);
  Usuarios = this.UsuariosSubject.asObservable();

  private ConceptosSubject = new BehaviorSubject<Concepto[]>([]);
  Conceptos = this.ConceptosSubject.asObservable();

  getUsuario() {
    this.api.GetData(this.endPointUsuarios).subscribe((data) => {
      if (data) {
        this.UsuariosSubject.next(data);
      }
    });
  }

  getConceptos() {
    this.api.GetData(this.endPointConceptos).subscribe((data) => {
      if (data) {
        this.ConceptosSubject.next(data);
      }
    });
  }

  getAllData() {
    if (this.authService.isAdmin()) {
      this.getUsuario();
    }
    this.getConceptos();
  }
}
