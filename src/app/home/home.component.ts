import { Component } from '@angular/core';
import * as d3TimeFormat from 'd3-time-format';
import { FetchDataService } from '../services/fetch-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  data: any;
  sales_data: Array<Object>;
  new_sales_data: Array<Object>;
  payments_data: Array<Object>;
  refunds_data: Array<Object>;
  activeTab: any;

  constructor(private fetchData: FetchDataService) {}

  // Update charts data with new data
  onDateFilterChange(event) {
    this.activeTab = event;
    var parseDate = d3TimeFormat.timeParse("%Y-%m-%d");

    this.fetchData.fetchChartData().then((response) => {

      Object.entries(response[event]).forEach(([key,value]) => {
        this[key] = value.map(( datum ) => {
          datum.date = parseDate(datum.date);
          return datum;
        });
      })
    });

  }

}
