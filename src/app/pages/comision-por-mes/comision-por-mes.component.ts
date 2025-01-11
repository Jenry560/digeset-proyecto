import { Component, inject, OnInit } from '@angular/core';
import { GlobalConfigService } from '../../services/global-config.service';
import { ApiService } from '../../services/api.service';
import { ComisionPorMes } from '../../models/ComisionPorMes';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-comision-por-mes',
  templateUrl: './comision-por-mes.component.html',
  styles: ``,
})
export class ComisionPorMesComponent implements OnInit {
  config = inject(GlobalConfigService);
  meses: any[] = [];
  private api = inject(ApiService);
  mesSelected = new Date().getMonth() + 1;
  comisionPorMes: ComisionPorMes = {} as ComisionPorMes;

  auth = inject(AuthService);

  ngOnInit(): void {
    this.getMoths();
    this.getData();
  }

  getData() {
    this.api
      .GetData(
        `Multas/comisionesPorMes/${this.auth.agenteData.AgenteId}/${this.mesSelected}`
      )
      .subscribe((res: any) => {
        console.log(res);
        this.comisionPorMes = res;
      });
  }

  getMoths() {
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
