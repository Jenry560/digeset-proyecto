import { Component, inject } from '@angular/core';
import { GlobalConfigService } from '../../services/global-config.service';

@Component({
  selector: 'app-comision-por-mes',
  templateUrl: './comision-por-mes.component.html',
  styles: ``,
})
export class ComisionPorMesComponent {
  config = inject(GlobalConfigService);
  meses = [
    {
      Id: 1,
      Nombre: 'Enero',
    },
    {
      Id: 2,
      Nombre: 'Febrero',
    },
    {
      Id: 3,
      Nombre: 'Marzo',
    },
    {
      Id: 4,
      Nombre: 'Abril',
    },
    {
      Id: 5,
      Nombre: 'Mayo',
    },
    {
      Id: 6,
      Nombre: 'Junio',
    },
    {
      Id: 7,
      Nombre: 'Julio',
    },
    {
      Id: 8,
      Nombre: 'Agosto',
    },
    {
      Id: 9,
      Nombre: 'Septiembre',
    },
    {
      Id: 10,
      Nombre: 'Octubre',
    },
    {
      Id: 11,
      Nombre: 'Noviembre',
    },
    {
      Id: 12,
      Nombre: 'Diciembre',
    },
  ];
  mesSelected = new Date().getMonth() + 1;
}
