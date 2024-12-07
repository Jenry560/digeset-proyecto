import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';
import { Usuarios } from '../models/Usuario';
import { AuthService } from './auth.service';
import { Concepto } from '../models/Concepto';
import { Agente } from '../models/Agente';
import { Multa } from '../models/Multa';

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

  private AgentesSubject = new BehaviorSubject<Agente[]>([]);
  Agentes = this.AgentesSubject.asObservable();

  private MultasSubject = new BehaviorSubject<Multa[]>([]);
  Multas = this.MultasSubject.asObservable();

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
  getAgentes() {
    this.api
      .GetData(`Agentes/${this.authService.usuarioData.UsuarioId}`)
      .subscribe((data) => {
        if (data) {
          this.AgentesSubject.next(data);
        }
      });
  }

  getMultas() {
    let endpoint = this.authService.isAgente()
      ? `Multas/AgenteId/${this.authService.agenteData.AgenteId}`
      : `Multas/UsuarioId/${this.authService.usuarioData.UsuarioId}`;
    this.api.GetData(endpoint).subscribe((data) => {
      if (data) {
        this.MultasSubject.next(data);
      }
    });
  }
  getAllData() {
    if (this.authService.isAdmin()) {
      this.getUsuario();
    }
    if (this.authService.isUser()) {
      this.getAgentes();
    }
    if (this.authService.isUser() || this.authService.isAgente()) {
      this.getMultas();
    }
    this.getConceptos();
  }
}
