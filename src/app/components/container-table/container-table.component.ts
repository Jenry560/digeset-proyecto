import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-container-table',
  templateUrl: './container-table.component.html',
  styles: ``,
})
export class ContainerTableComponent {
  @Input() titulo: string = '';
  @Input() labelBoton: string = '';
  @Input() navegarHacia: string = '';
  @Input() visibleBoton: boolean = true;
  @Input() iconBotonSecundario: string = 'fa-solid fa-copy';
  @Input() labelBotonSecundario: string = '';

  @Output() botonFuncionClick = new EventEmitter<any>();

  private router = inject(Router);

  ejecutarBoton() {
    if (this.navegarHacia == '') {
      this.botonFuncionClick.emit();
    } else {
      this.router.navigate([this.navegarHacia]);
    }
  }
}
