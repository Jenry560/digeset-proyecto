import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NgxApexchartsModule } from 'ngx-apexcharts';
import { Grafico } from '../../models/Grafico';
import { DatosService } from '../../services/datos.service';
import { first, firstValueFrom } from 'rxjs';
import { Multa } from '../../models/Multa';
import { Concepto } from '../../models/Concepto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgxApexchartsModule],
  templateUrl: './dashboard.component.html',
  styles: ``,
})
export class DashboardComponent implements OnInit {
  public chartReporteVenta: Grafico = {} as Grafico;
  public chartReporteVenta2: any = {} as any;
  private datosService = inject(DatosService);
  multas: Multa[] = [];
  conceptos: Concepto[] = [];
  dataModelo: any;
  cantidadMultas: number = 0;
  totalIngresosMulta: number = 0;
  cantidadActiva = 0;
  cantidadTipoMultas = 0;
  ngOnInit(): void {
    this.dataModelo = this.getDataModelo();
    this.getData();
  }

  getData() {
    this.datosService.Multas.subscribe((multas) => {
      this.multas = multas;
      this.datosService.Conceptos.subscribe((conceptos) => {
        if (conceptos) {
          this.conceptos = conceptos;
          this.cantidadActiva = multas.filter((x) => x.EstadoId == 0).length;
          this.cantidadMultas = multas.length;
          this.cantidadTipoMultas = conceptos.length;
          this.chartReporteVenta = {
            xaxis: {
              categories: [],
            },
            series: [
              {
                name: 'Conceptos',
                data: [],
              },
            ],
          };
          conceptos.forEach((x) => {
            let multasPorConcepto = multas.filter(
              (y) => y.ConceptoId == x.ConceptoId
            );
            this.chartReporteVenta.xaxis.categories.push(x.Descripcion);
            this.chartReporteVenta.series[0].data.push(
              multasPorConcepto.length
            );
            this.totalIngresosMulta += multasPorConcepto.length * x.Monto;
          });
        }
      });
      this.chartReporteVenta2 = {
        labels: ['Activa', 'Cobrada', 'Perdonada'],
        series: [],
      };
      this.chartReporteVenta2.series[0] = multas.filter(
        (x) => x.EstadoId == 0
      ).length;

      this.chartReporteVenta2.series[1] = multas.filter(
        (x) => x.EstadoId == 1
      ).length;
      this.chartReporteVenta2.series[2] = multas.filter(
        (x) => x.EstadoId == 2
      ).length;
    });
  }
  getDataModelo() {
    return {
      series: [
        {
          data: [], // Datos de ejemplo
        },
      ],
      chart: {
        type: 'bar', // Tipo de gráfico: columnas
        height: 335,
      },
      xaxis: {
        categories: [],
      },

      plotOptions: {
        bar: {
          distributed: true, // Importante para aplicar diferentes colores a cada columna
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: number) {
          return val.toLocaleString('en-US');
        },
      },
      yaxis: {
        labels: {
          formatter: function (value: number) {
            return value.toLocaleString('en-US');
          },
        },
      },
    };
  }
}
