import { Component, inject, OnInit } from '@angular/core';
import { GlobalConfigService } from '../../services/global-config.service';
import { ReporteIngreso } from '../../models/ReporteIngreso';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reporte-ingresos',
  templateUrl: './reporte-ingresos.component.html',
  styles: ``,
})
export class ReporteIngresosComponent implements OnInit {
  config = inject(GlobalConfigService);
  private api = inject(ApiService);
  auth = inject(AuthService);
  reporteIngresos: ReporteIngreso[] = [];
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
    this.getReporte();
  }

  getReporte() {
    this.reporteIngresos = [];
    this.api
      .GetData(
        `Multas/reporteIngreso/${this.auth.usuarioData.UsuarioId}/${this.mesSelected}/${this.selectedYear}`
      )
      .subscribe((res: any) => {
        this.reporteIngresos = res;
      });
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
