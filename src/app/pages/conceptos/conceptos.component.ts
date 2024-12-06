import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { GlobalConfigService } from '../../services/global-config.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Concepto } from '../../models/Concepto';

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

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      AgenteId: [0, Validators.required], // Campo obligatorio
      Nombre: ['', [Validators.required, Validators.minLength(3)]], // Mínimo 3 caracteres
      Cedula: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]], // Cédula debe tener 11 caracteres numéricos
      Clave: ['', [Validators.required, Validators.minLength(6)]], // Mínimo 6 caracteres para la clave
      Estado: [false], // Valor por defecto de estado
      UsuarioId: [this.auth.usuarioData.UsuarioId], // Campo obligatorio
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
