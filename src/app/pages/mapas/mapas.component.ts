import { AfterViewInit, Component, inject } from '@angular/core';
import { GlobalConfigService } from '../../services/global-config.service';
import * as L from 'leaflet';
@Component({
  selector: 'app-mapas',
  templateUrl: './mapas.component.html',
  styles: ``,
})
export class MapasComponent implements AfterViewInit {
  config = inject(GlobalConfigService);
  meses: any = [];
  mesSelected = new Date().getMonth() + 1;
  years: number[] = [];
  selectedYear: number | undefined;
  private map!: L.Map;

  ngAfterViewInit(): void {
    this.initMap();
  }
  ngOnInit(): void {
    this.getMonths();
    this.years = Array.from(
      { length: 50 },
      (_, i) => new Date().getFullYear() - i
    );
    this.selectedYear = new Date().getFullYear();
  }

  private initMap(): void {
    // Inicializar el mapa centrado en la República Dominicana
    this.map = L.map('map').setView([18.7357, -70.1627], 8); // Coordenadas aproximadas del centro del país

    // Agregar capa base (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    // Agregar marcador para Santo Domingo
    const santoDomingo: any = {
      coords: [18.4861, -69.9312], // Coordenadas de Santo Domingo
      details: 'Santo Domingo, República Dominicana. Capital del país.',
    };

    const marker = L.marker(santoDomingo.coords)
      .addTo(this.map)
      .bindPopup(`<b>Ubicación:</b> Santo Domingo<br>${santoDomingo.details}`);

    // Mostrar popup al hacer clic en el marcador
    marker.on('click', () => {
      marker.openPopup();
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
