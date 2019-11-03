import { Component } from '@angular/core';
import * as d3TimeFormat from 'd3-time-format';
import { FetchDataService } from '../services/fetch-data.service'

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

  constructor(private fetchData: FetchDataService) {
    this.fetchData.fetchChartData().then((response) => {
      this.data = response;
    });

  }

  // Update charts data with new data
  async onDateFilterChange(event) {
    this.activeTab = event;
    let parseDate = d3TimeFormat.timeParse("%Y-%m-%d");

    if(!!this.data) {
      let clonedData = JSON.parse(JSON.stringify(this.data)); // Javascript Deep Copy
      Object.entries(clonedData[event]).forEach(([key,value]: any) => {
        this[key] = value.map(( datum ) => {
          if(!(datum instanceof Date)) {
            datum.date = parseDate(datum.date);
          }
          return datum;
        });
      });
    }
  }
}
