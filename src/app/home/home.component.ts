import { Component, OnInit } from '@angular/core';
import * as d3Fetch from 'd3-fetch';
import * as d3TimeFormat from 'd3-time-format';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoading = false;
  data: any;
  sales_data: any;
  new_sales_data: any;
  payments_data: any;
  refunds_data: any;

  constructor() {}

  ngOnInit() {
    this.isLoading = true;

    var parseDate = d3TimeFormat.timeParse("%Y-%m-%d");

    d3Fetch.json("../assets/data/line-chart.json").then((response) => {
      this.data = response.map(( datum ) => {
        datum.date = parseDate(datum.date);
        return datum;
      });

      this.sales_data = this.data;
      this.new_sales_data = this.data;
      this.payments_data = this.data;
      this.refunds_data = this.data;

      this.isLoading = false;
    });

  }
}
