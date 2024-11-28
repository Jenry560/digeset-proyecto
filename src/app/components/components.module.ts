import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerTableComponent } from './container-table/container-table.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [ContainerTableComponent],
  exports: [ContainerTableComponent],
  imports: [CommonModule, NgSelectModule, DatePickerModule, FormsModule],
})
export class ComponentsModule {}
