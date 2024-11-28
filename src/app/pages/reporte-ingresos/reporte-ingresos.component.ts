import { Component, inject, OnInit } from '@angular/core';
import { GlobalConfigService } from '../../services/global-config.service';

@Component({
  selector: 'app-reporte-ingresos',
  templateUrl: './reporte-ingresos.component.html',
  styles: ``,
})
export class ReporteIngresosComponent implements OnInit {
  config = inject(GlobalConfigService);
  meses: any = [];
  mesSelected = new Date().getMonth() + 1;
  years: number[] = [];
  selectedYear: number | undefined;

  ngOnInit(): void {
    this.getMonths();
    this.years = Array.from(
      { length: 50 },
      (_, i) => new Date().getFullYear() - i
    );
    this.selectedYear = new Date().getFullYear();
  }

  getMonths() {
    this.meses = [
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
  }
}
