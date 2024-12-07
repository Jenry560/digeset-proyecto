import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { GlobalConfigService } from '../../services/global-config.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Agente } from '../../models/Agente';
import { DataResponse } from '../../models/DataResponse';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { DatosService } from '../../services/datos.service';

@Component({
  selector: 'app-agentes',
  templateUrl: './agentes.component.html',
  styles: ``,
})
export class AgentesComponent {
  @ViewChild('content') content!: any;
  config = inject(GlobalConfigService);
  private modalService = inject(NgbModal);
  tituloModal = 'Registrar agente';
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  agentes: Agente[] = [];
  form!: FormGroup;
  private api = inject(ApiService);
  private datosService = inject(DatosService);

  ngOnInit(): void {
    this.buildForm();
    this.getData();
  }

  buildForm() {
    this.form = this.fb.group({
      Id: [0],
      AgenteId: [0, Validators.required], // Campo obligatorio
      Nombre: ['', [Validators.required, Validators.minLength(3)]], // Mínimo 3 caracteres
      Cedula: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]], // Cédula debe tener 11 caracteres numéricos
      Clave: ['', [Validators.required, Validators.minLength(4)]], // Mínimo 6 caracteres para la clave
      Estado: [true], // Valor por defecto de estado
      UsuarioId: [this.auth.usuarioData?.UsuarioId], // Campo obligatorio
    });
  }

  async saveData() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    var respuesta: DataResponse = {} as DataResponse;
    if (this.form.value.AgenteId == 0) {
      respuesta = await firstValueFrom(
        this.api.PostData('Agentes', this.form.value)
      );
    } else {
      respuesta = await firstValueFrom(
        this.api.PutData(`Agentes/${this.form.value.AgenteId}`, this.form.value)
      );
    }

    if (respuesta.IsSuccess) {
      this.auth.showNotification('Exito', respuesta.Message, 'success');
      this.closeModal();
      this.datosService.getAgentes();
    } else {
      this.auth.ShowMessaje('Error', respuesta.Message, 'error');
    }
  }

  getData() {
    this.datosService.Agentes.subscribe((res) => {
      this.agentes = res;
    });
  }

  updateEstado(_t24: Agente) {
    this.api
      .PutData(`Agentes/Estado/${_t24.AgenteId}/${_t24.Estado}`, null)
      .subscribe((res: any) => {
        if (res.IsSuccess) {
          this.auth.showNotification('Exito', res.Message, 'success');
          this.datosService.getAgentes();
        } else {
          this.auth.ShowMessaje('Error', res.Message, 'error');
        }
      });
  }
  openModal(model: any) {
    if (model != null) {
      this.tituloModal = 'Editar agente';
      this.form.patchValue(model);
    } else {
      this.tituloModal = 'Registrar agente';
      this.buildForm();
    }
    this.modalService.open(this.content, { centered: true });
  }
  closeModal() {
    this.modalService.dismissAll();
  }

  InvalidControl(name: string) {
    // retorna true si el campo es invalido
    return this.form.get(name)?.invalid && this.form.get(name)?.touched;
  }
}
