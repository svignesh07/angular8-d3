import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { LineChartComponent } from './line-chart/line-chart.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LoaderComponent, LineChartComponent],
  exports: [LoaderComponent, LineChartComponent]
})
export class SharedModule {}
