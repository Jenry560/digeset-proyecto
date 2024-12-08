import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
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
  selectedFile: File | null = null;
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
      Descripcion: 'Perdonada',
    },
  ];

  ngOnInit(): void {
    this.buildForm();
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
      EstadoId: [0, Validators.required], // Número obligatorio
      AgenteId: [this.auth.isAgente() ? this.auth.agenteData.AgenteId : 0],
    });
  }

  async saveData() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!this.selectedFile) {
      this.auth.ShowMessaje('Error', 'Debe seleccionar una imagen', 'error');
      return;
    }

    const formData = new FormData();

    // Agregar los datos del formulario al FormData
    Object.entries(this.form.value).forEach(([key, value]) => {
      // Manejar valores nulos o indefinidos
      if (value !== null && value !== undefined) {
        formData.append(key, value.toString());
      }
    });

    // Agregar el archivo con el nombre esperado por el backend
    formData.append('foto', this.selectedFile, this.selectedFile.name);

    var respuesta: DataResponse = {} as DataResponse;

    try {
      if (this.form.value.MultaId === 0) {
        respuesta = await firstValueFrom(
          this.api.PostFormData('Multas', formData)
        );
      } else {
        respuesta = await firstValueFrom(
          this.api.PutFormData(`Multas/${this.form.value.MultaId}`, formData)
        );
      }

      if (respuesta.IsSuccess) {
        this.auth.showNotification('Exito', respuesta.Message, 'success');
        this.closeModal();
        this.datosService.getMultas();
        this.selectedFile = null;
      } else {
        this.auth.ShowMessaje('Error', respuesta.Message, 'error');
      }
    } catch (error) {
      this.auth.ShowMessaje(
        'Error',
        'Ocurrió un error al guardar los datos',
        'error'
      );
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
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0]; // Guardar el archivo seleccionado
    }
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
  openModal(model: any, file: any = null) {
    if (model != null) {
      this.tituloModal = 'Editar multa';
      this.form.patchValue(model);
      // this.setFileFromBase64(model.Foto, 'imagen.png');
    } else {
      this.tituloModal = 'Registrar multa';
      this.buildForm();
    }
    this.modalService.open(this.content, { centered: true });
  }
  closeModal() {
    this.modalService.dismissAll();
  }

  setFileFromBase64(base64Image: string, fileName: string): void {
    try {
      // Obtener el elemento directamente por su id
      const fileInput =
        document.querySelector<HTMLInputElement>('#fileInputId');
      if (!fileInput) {
        console.error('No se encontró el elemento del input de archivo.');
        return;
      }

      // Convertir la imagen Base64 a un archivo
      const base64Data = base64Image.includes(',')
        ? base64Image.split(',')[1]
        : base64Image;
      const byteString = atob(base64Data);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const uint8Array = new Uint8Array(arrayBuffer);

      for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i);
      }

      const file = new File([uint8Array], fileName, { type: 'image/png' });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);

      // Asignar el archivo al input
      fileInput.files = dataTransfer.files;
      console.log(`Archivo asignado correctamente: ${file.name}`);
    } catch (error) {
      console.error('Error al asignar el archivo:', error);
    }
  }

  InvalidControl(name: string) {
    // retorna true si el campo es invalido
    return this.form.get(name)?.invalid && this.form.get(name)?.touched;
  }
}
