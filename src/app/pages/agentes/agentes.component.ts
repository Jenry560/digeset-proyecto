import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { GlobalConfigService } from '../../services/global-config.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

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
  form!: FormGroup;

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      Id: [0],
      Nombre: ['', Validators.required],
      Direccion: [''],
      Telefono: ['', [Validators.required]],
      PlantillaId: [0],
      RutaId: [null, Validators.required],
      GrupoId: [null, Validators.required],
      Encargado: ['', Validators.required],
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
