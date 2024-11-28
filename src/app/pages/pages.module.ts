import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { ComponentsModule } from '../components/components.module';
import { AcercaDeComponent } from './acerca-de/acerca-de.component';
import { AgentesComponent } from './agentes/agentes.component';
import { ComisionPorMesComponent } from './comision-por-mes/comision-por-mes.component';
import { ConceptosComponent } from './conceptos/conceptos.component';
import { MapasComponent } from './mapas/mapas.component';
import { MultasComponent } from './multas/multas.component';
import { ReporteIngresosComponent } from './reporte-ingresos/reporte-ingresos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import {
  ColumnMenuService,
  ExcelExportService,
  FilterService,
  GridModule,
  PageService,
  ResizeService,
  SortService,
  ToolbarService,
} from '@syncfusion/ej2-angular-grids';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AcercaDeComponent,
    AgentesComponent,
    ComisionPorMesComponent,
    ConceptosComponent,
    MapasComponent,
    MultasComponent,
    ReporteIngresosComponent,
    UsuariosComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ComponentsModule,
    GridModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    NgSelectModule,
  ],
  providers: [
    PageService,
    FilterService,
    SortService,
    ToolbarService,
    ExcelExportService,
    ColumnMenuService,
    ResizeService,
  ],
})
export class PagesModule {}
