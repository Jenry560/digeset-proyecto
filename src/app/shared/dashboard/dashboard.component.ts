import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxApexchartsModule } from 'ngx-apexcharts';
import { Grafico } from '../../models/Grafico';

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
  dataModelo: any;

  ngOnInit(): void {
    this.dataModelo = this.getDataModelo();
    this.getData();
  }

  getData() {
    this.chartReporteVenta = {
      xaxis: {
        categories: ['Activa', 'Cobrada', 'Perdonada'],
      },

      series: [
        {
          name: 'Estatus',
          data: [44, 55, 41],
        },
      ],
    };

    this.chartReporteVenta2 = {
      labels: ['Activa', 'Cobrada', 'Perdonada'],
      series: [44, 55, 41],
    };
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
