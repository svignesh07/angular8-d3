import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { BarLineChartComponent } from './bar-line-chart/bar-line-chart.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LoaderComponent, LineChartComponent, BarLineChartComponent],
  exports: [LoaderComponent, LineChartComponent, BarLineChartComponent]
})
export class SharedModule {}
