import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MultasComponent } from './multas/multas.component';
import { AcercaDeComponent } from './acerca-de/acerca-de.component';
import { AgentesComponent } from './agentes/agentes.component';
import { ComisionPorMesComponent } from './comision-por-mes/comision-por-mes.component';
import { ConceptosComponent } from './conceptos/conceptos.component';
import { ReporteIngresosComponent } from './reporte-ingresos/reporte-ingresos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { MapasComponent } from './mapas/mapas.component';
import { adminGuard } from '../guards/admin.guard';
import { usuarioGuard } from '../guards/usuario.guard';
import { agenteGuard } from '../guards/agente.guard';

const routes: Routes = [
  {
    path: 'multas',
    component: MultasComponent,
  },
  {
    path: 'acerca-de',
    component: AcercaDeComponent,
  },
  {
    path: 'agentes',
    component: AgentesComponent,
    canActivate: [usuarioGuard],
  },
  {
    path: 'comision-por-mes',
    component: ComisionPorMesComponent,
    canActivate: [agenteGuard],
  },
  {
    path: 'mapa',
    component: MapasComponent,
  },
  {
    path: 'conceptos',
    component: ConceptosComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'reporte-de-ingresos',
    component: ReporteIngresosComponent,
    canActivate: [usuarioGuard],
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [adminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
