import { AfterViewInit, Component, inject } from '@angular/core';
import { GlobalConfigService } from '../../services/global-config.service';
import * as L from 'leaflet';
import { Multa } from '../../models/Multa';
import { DatosService } from '../../services/datos.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-mapas',
  templateUrl: './mapas.component.html',
  styles: ``,
})
export class MapasComponent implements AfterViewInit {
  config = inject(GlobalConfigService);

  private datosServices = inject(DatosService);
  auth = inject(AuthService);
  meses: any = [];
  mesSelected = new Date().getMonth() + 1;
  years: number[] = [];
  selectedYear: number | undefined;
  private map!: L.Map;
  private markersLayer: any; // Capa para los marcadores de las multas
  multas: Multa[] = [];
  AllMultas: Multa[] = [];

  ngAfterViewInit(): void {
    this.initMap();
    this.getMultas();
  }
  ngOnInit(): void {
    this.getMonths();
    this.years = Array.from(
      { length: 50 },
      (_, i) => new Date().getFullYear() - i
    );
    this.selectedYear = new Date().getFullYear();
  }

  async getMultas() {
    this.datosServices.Multas.subscribe((res) => {
      this.multas = res;
      this.AllMultas = res;
      this.filterMulta();
    });
  }

  filterMulta() {
    if (this.auth.isUser()) {
      this.multas = this.AllMultas.filter(
        (x) =>
          new Date(x.FechaCreacion).getMonth() == this.mesSelected - 1 &&
          new Date(x.FechaCreacion).getFullYear() == this.selectedYear
      );
    } else {
      const today = new Date();
      const fourWeeksAgo = new Date();
      fourWeeksAgo.setDate(today.getDate() - 28); // Retrocede 4 semanas (28 días)

      // Filtrar multas
      this.multas = this.AllMultas.filter((x) => {
        const fechaMulta = new Date(x.FechaCreacion); // Asegúrate de convertirlo a Date si es necesario
        return fechaMulta >= fourWeeksAgo;
      });
    }
    // filtrar por la multas de las ultimas 4 semanas
    this.addMultasToMap();
  }

  private initMap(): void {
    // Inicializar el mapa centrado en la República Dominicana
    this.map = L.map('map').setView([18.7357, -70.1627], 8); // Coordenadas aproximadas del centro del país

    // Agregar capa base (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    // Crear una capa para los marcadores y agregarla al mapa
    this.markersLayer = L.layerGroup().addTo(this.map);
  }

  // Método para agregar multas al mapa
  private addMultasToMap(): void {
    // Limpiar marcadores existentes
    this.markersLayer.clearLayers();

    // Agregar marcadores para cada multa
    this.multas.forEach((multa: Multa) => {
      if (multa.Latitud && multa.Longitud) {
        // Crear marcador
        const marker = L.marker([multa.Latitud, multa.Longitud]);

        // Configurar el contenido del popup
        const popupContent = `
          <b>Multa ID:</b> ${multa.MultaId}<br>
          <b>Nombre:</b> ${multa.Nombre}<br>
          <b>Descripción:</b> ${multa.Descripcion}<br>
          <b>Estado:</b> ${
            multa.EstadoId == 0
              ? 'Activa'
              : multa.EstadoId == 1
              ? 'Cobrada'
              : 'Perdonada'
          }<br>
          <b>Agente:</b> ${multa.Agente}<br>
          <b>Fecha:</b> ${new Date(
            multa.FechaCreacion
          ).toLocaleDateString()}<br>
          ${
            multa.Foto
              ? `<img src="data:image/png;base64,${multa.Foto}" alt="Foto de la multa" style="width:100%;max-width:200px;">`
              : ''
          }
        `;

        // Asociar el popup al marcador
        marker.bindPopup(popupContent);

        // Agregar marcador a la capa
        marker.addTo(this.markersLayer);
      }
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
