import { Injectable } from '@angular/core';
import * as d3Fetch from 'd3-fetch';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  dataURL = "../assets/data/chart-data.json";

  constructor() { }

  fetchChartData() {
    return d3Fetch.json(this.dataURL);
  }
}
