import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { GlobalConfigService } from '../../services/global-config.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Multa } from '../../models/Multa';
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
  private auth = inject(AuthService);
  multas: Multa[] = [];
  form!: FormGroup;

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      MultaId: [0, Validators.required], // Número, inicia en 0
      Cedula: ['', [Validators.required, Validators.pattern(/^\d{3}-\d{7}-\d{1}$/)]], // Patrón para una cédula en formato dominicano
      Nombre: ['', Validators.required], // Nombre obligatorio
      ConceptoId: [null, Validators.required], // Número obligatorio
      Descripcion: [''], // No obligatorio
      Latitud: [null, [Validators.required, Validators.min(-90), Validators.max(90)]], // Latitud entre -90 y 90
      Longitud: [null, [Validators.required, Validators.min(-180), Validators.max(180)]], // Longitud entre -180 y 180
      Foto: [''], // Foto opcional, puede ser una URL
      FechaCreacion: [new Date(), Validators.required], // Fecha actual como valor inicial
      EstadoId: [0, Validators.required] // Número obligatorio
    });
  }

  saveData() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
  }
  openModal(model: any) {
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
