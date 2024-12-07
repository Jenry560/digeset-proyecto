import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { GlobalConfigService } from '../../services/global-config.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Multa } from '../../models/Multa';
import { ApiService } from '../../services/api.service';
import { DatosService } from '../../services/datos.service';
import { DataResponse } from '../../models/DataResponse';
import { firstValueFrom } from 'rxjs';
import { Concepto } from '../../models/Concepto';
@Component({
  selector: 'app-multas',
  templateUrl: './multas.component.html',
  styles: ``,
})
export class MultasComponent implements OnInit {
  @ViewChild('content') content!: any;
  config = inject(GlobalConfigService);
  private modalService = inject(NgbModal);
  tituloModal = 'Registrar multa';
  private fb = inject(FormBuilder);
  auth = inject(AuthService);
  private api = inject(ApiService);
  private datosService = inject(DatosService);
  multas: Multa[] = [];
  conceptos: Concepto[] = [];
  form!: FormGroup;
  estadosMulta = [
    {
      EstadoId: 0,
      Descripcion: 'Activa',
    },
    {
      EstadoId: 1,
      Descripcion: 'Cobrada',
    },
    {
      EstadoId: 2,
      Descripcion: 'Cobrada',
    },
  ];

  ngOnInit(): void {
    if (this.auth.isAgente()) {
      this.buildForm();
    }
    this.getData();
  }

  buildForm() {
    this.form = this.fb.group({
      MultaId: [0], // Número, inicia en 0
      Cedula: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]], // Cédula debe tener 11 caracteres numéricos
      Nombre: ['', Validators.required], // Nombre obligatorio
      ConceptoId: [null, Validators.required], // Número obligatorio
      Descripcion: [''], // No obligatorio
      Latitud: [
        null,
        [Validators.required, Validators.min(-90), Validators.max(90)],
      ], // Latitud entre -90 y 90
      Longitud: [
        null,
        [Validators.required, Validators.min(-180), Validators.max(180)],
      ], // Longitud entre -180 y 180
      Foto: [''], // Foto opcional, puede ser una URL
      FechaCreacion: [new Date(), Validators.required], // Fecha actual como valor inicial
      EstadoId: [0, Validators.required], // Número obligatorio
      AgenteId: [this.auth.agenteData.AgenteId],
    });
  }

  async saveData() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    var respuesta: DataResponse = {} as DataResponse;
    if (this.form.value.MultaId == 0) {
      respuesta = await firstValueFrom(
        this.api.PostData('Multas', this.form.value)
      );
    } else {
      respuesta = await firstValueFrom(
        this.api.PutData(`Multas/${this.form.value.MultaId}`, this.form.value)
      );
    }

    if (respuesta.IsSuccess) {
      this.auth.showNotification('Exito', respuesta.Message, 'success');
      this.closeModal();
      this.datosService.getMultas();
    } else {
      this.auth.ShowMessaje('Error', respuesta.Message, 'error');
    }
  }
  deleteData(id: number) {
    this.auth
      .ShowConfirm(
        'Esta seguro de eliminar el multa?',
        '',
        'Si, eliminar',
        'question'
      )
      .then((result) => {
        if (result) {
          this.api.Delete(`Multas/${id}`).subscribe((data) => {
            if (data.IsSuccess) {
              this.auth.showNotification('Exito', data.Message, 'success');
              this.datosService.getMultas();
            } else {
              this.auth.ShowMessaje('Error', data.Message, 'error');
            }
          });
        }
      });
  }

  getData() {
    this.datosService.Conceptos.subscribe((res) => {
      this.conceptos = res;
    });
    this.datosService.Multas.subscribe((res) => {
      this.multas = res;
      this.multas.map((x) => {
        x.FechaCreacion = new Date(x.FechaCreacion);
      });
    });
  }

  cambiarEstatus(_t39: Multa) {
    this.api
      .PutData(`Multas/Estado/${_t39.MultaId}/${_t39.EstadoId}`, null)
      .subscribe((data) => {
        if (data.IsSuccess) {
          this.auth.showNotification('Exito', data.Message, 'success');
          this.datosService.getMultas();
        } else {
          this.auth.ShowMessaje('Error', data.Message, 'error');
        }
      });
  }
  openModal(model: any) {
    if (model != null) {
      this.tituloModal = 'Editar multa';
      this.form.patchValue(model);
    } else {
      this.tituloModal = 'Registrar multa';
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
