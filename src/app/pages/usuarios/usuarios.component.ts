import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { GlobalConfigService } from '../../services/global-config.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { DatosService } from '../../services/datos.service';
import { Usuarios } from '../../models/Usuario';
import { DataResponse } from '../../models/DataResponse';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: ``,
})
export class UsuariosComponent {
  private api = inject(ApiService);
  private datosService = inject(DatosService);
  @ViewChild('content') content!: any;
  config = inject(GlobalConfigService);
  private modalService = inject(NgbModal);
  usuarios: Usuarios[] = [];
  tituloModal = 'Registrar usuarios';
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  form!: FormGroup;

  ngOnInit(): void {
    this.buildForm();
    this.getData();
  }

  buildForm() {
    this.form = this.fb.group({
      UsuarioId: [0], // Puede estar vacío al crearlo
      Nombre: ['', [Validators.required, Validators.minLength(3)]],
      Cedula: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]], // Cédula debe tener 11 caracteres numéricos
      Clave: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  async saveData() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (!this.checkIsCedulaUnique()) {
      this.auth.ShowMessaje('Error', 'La cedula ya existe', 'error');
      return;
    }

    var respuesta: DataResponse = {} as DataResponse;

    if (this.form.value.UsuarioId == 0) {
      respuesta = await firstValueFrom(
        this.api.PostData('Usuarios', this.form.value)
      );
    } else {
      respuesta = await firstValueFrom(
        this.api.PutData(
          `Usuarios/${this.form.value.UsuarioId}`,
          this.form.value
        )
      );
    }

    if (respuesta.IsSuccess) {
      this.auth.showNotification('Exito', respuesta.Message, 'success');
      this.closeModal();
      this.datosService.getUsuario();
    } else {
      this.auth.ShowMessaje('Error', respuesta.Message, 'error');
    }
  }
  deleteUsuario(id: number) {
    this.auth
      .ShowConfirm(
        'Esta seguro de eliminar el usuario?',
        '',
        'Si, eliminar',
        'question'
      )
      .then((result) => {
        if (result) {
          this.api.Delete(`Usuarios/${id}`).subscribe((data) => {
            if (data.IsSuccess) {
              this.auth.showNotification('Exito', data.Message, 'success');
              this.datosService.getUsuario();
            } else {
              this.auth.ShowMessaje('Error', data.Message, 'error');
            }
          });
        }
      });
  }

  checkIsCedulaUnique() {
    const cedula = this.form.get('Cedula')?.value;
    const isUnique = this.usuarios.every((user) => user.Cedula !== cedula);
    return isUnique;
  }

  getData() {
    this.datosService.Usuarios.subscribe((res) => {
      this.usuarios = res;
    });
  }
  openModal(model: any) {
    if (model != null) {
      this.tituloModal = 'Editar usuario';
      this.form.patchValue(model);
    } else {
      this.tituloModal = 'Registrar usuario';
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
