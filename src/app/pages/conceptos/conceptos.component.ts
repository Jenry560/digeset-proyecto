import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { GlobalConfigService } from '../../services/global-config.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Concepto } from '../../models/Concepto';
import { DataResponse } from '../../models/DataResponse';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { DatosService } from '../../services/datos.service';

@Component({
  selector: 'app-conceptos',
  templateUrl: './conceptos.component.html',
  styles: ``,
})
export class ConceptosComponent {
  @ViewChild('content') content!: any;
  config = inject(GlobalConfigService);
  private modalService = inject(NgbModal);
  tituloModal = 'Registrar concepto';
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  conceptos: Concepto[] = [];
  form!: FormGroup;
  private api = inject(ApiService);
  private datosService = inject(DatosService);

  ngOnInit(): void {
    this.buildForm();
    this.getData();
  }

  buildForm() {
    this.form = this.fb.group({
      ConceptoId: [0], // Campo obligatorio
      Descripcion: ['', [Validators.required, Validators.minLength(3)]], // Mínimo 3 caracteres
      Monto: [1, [Validators.required, Validators.min(1)]], // Valor mínimo 0
    });
  }

  async saveData() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    var respuesta: DataResponse = {} as DataResponse;
    if (this.form.value.ConceptoId == 0) {
      respuesta = await firstValueFrom(
        this.api.PostData('Conceptos', this.form.value)
      );
    } else {
      respuesta = await firstValueFrom(
        this.api.PutData(`Conceptos`, this.form.value)
      );
    }

    if (respuesta.IsSuccess) {
      this.auth.showNotification('Exito', respuesta.Message, 'success');
      this.closeModal();
      this.datosService.getConceptos();
    } else {
      this.auth.ShowMessaje('Error', respuesta.Message, 'error');
    }
  }
  deleteData(id: number) {
    this.auth
      .ShowConfirm(
        'Esta seguro de eliminar el concepto?',
        '',
        'Si, eliminar',
        'question'
      )
      .then((result) => {
        if (result) {
          this.api.Delete(`Conceptos/${id}`).subscribe((data) => {
            if (data.IsSuccess) {
              this.auth.showNotification('Exito', data.Message, 'success');
              this.datosService.getConceptos();
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
  }
  openModal(model: any) {
    if (model != null) {
      this.tituloModal = 'Editar concepto';
      this.form.patchValue(model);
    } else {
      this.tituloModal = 'Registrar concepto';
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
