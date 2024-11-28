import { Injectable } from '@angular/core';
import { PageSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-grids';

@Injectable({
  providedIn: 'root',
})
//Metodo global para la configuracion de la grids de la libreria ejs grid
export class GlobalConfigService {
  pageSettings: PageSettingsModel = { pageSize: 30 }; // Cantidad de pagina por defecto
  toolbarOptions: ToolbarItems[] = ['Search', 'ExcelExport']; //  Opciones de barra de herramientas
  toolbarOptions2: ToolbarItems[] = ['Search']; //  Opciones de barra de herramientas2 solo el serach
  filterOptions: Object = { type: 'Excel' }; // Opciones de filtro
  editSettings: object = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: false,
    mode: 'Normal',
  }; // Configuración de edición

  // Metodo del toolbar para poder exportar al excel
  public toolbarClick(args: any, grid: any): void {
    if (args.item.id === 'Grid_excelexport') {
      grid?.excelExport();
    }
  }

  exportAllColumns(args: any, grid: any, titulo: string) {
    // 1. Obtener los datos directamente del dataSource
    if (args.item.id === 'Grid_excelexport') {
      grid?.excelExport({
        fileName: `${titulo}.xlsx`,
      });
    }
  }
}
