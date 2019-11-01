import { Component } from '@angular/core';
import * as d3Fetch from 'd3-fetch';
import * as d3TimeFormat from 'd3-time-format';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  is_loading = false;
  data: any;
  sales_data: Array<Object>;
  new_sales_data: Array<Object>;
  payments_data: Array<Object>;
  refunds_data: Array<Object>;

  constructor() {}

  // Update charts data with new data
  onDateFilterChange(event) {

    this.is_loading = true;
    var parseDate = d3TimeFormat.timeParse("%Y-%m-%d");

    d3Fetch.json("../assets/data/line-chart.json").then((response) => {

      Object.entries(response[event]).forEach(([key,value]) => {
        this[key] = value.map(( datum ) => {
          datum.date = parseDate(datum.date);
          return datum;
        });
      })

      this.is_loading = false;
    });
  }

}
