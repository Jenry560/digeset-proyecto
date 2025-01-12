import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
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

  async getUsuario() {
    var data = await firstValueFrom(this.api.GetData(this.endPointUsuarios));
    this.UsuariosSubject.next(data);
  }

  async getConceptos() {
    let data = await firstValueFrom(this.api.GetData(this.endPointConceptos));
    this.ConceptosSubject.next(data);
  }
  async getAgentes() {
    let data = await firstValueFrom(
      this.api.GetData(`Agentes/${this.authService.usuarioData.UsuarioId}`)
    );
    this.AgentesSubject.next(data);
  }

  getMultas() {
    let endpoint = this.authService.isAgente()
      ? `Multas/AgenteId/${this.authService.agenteData.AgenteId}`
      : `Multas/UsuarioId/${this.authService.usuarioData.UsuarioId}`;
    this.api.GetData(endpoint).subscribe((data) => {
      if (data) {
        let dataConvert = data as Multa[];
        dataConvert.map((x) => {
          x.Agente =
            this.AgentesSubject.getValue().find((y) => y.AgenteId == x.AgenteId)
              ?.Nombre ?? '';
          x.Concepto =
            this.ConceptosSubject.getValue().find(
              (y) => y.ConceptoId == x.ConceptoId
            )?.Descripcion ?? '';
          x.Monto =
            this.ConceptosSubject.getValue().find(
              (m) => m.ConceptoId == x.ConceptoId
            )?.Monto ?? 0;
        });
        this.MultasSubject.next(data);
      }
    });
  }
  async getAllData() {
    AuthService.loadingHeader = false;
    await this.getConceptos();

    if (this.authService.isAdmin()) {
      await this.getUsuario();
    }
    if (this.authService.isUser()) {
      await this.getAgentes();
    }
    AuthService.loadingHeader = true;
    this.getMultas();
  }
}
