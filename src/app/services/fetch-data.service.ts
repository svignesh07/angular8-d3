import { Injectable } from '@angular/core';
import * as d3Fetch from 'd3-fetch';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  dataURL: string;

  constructor() {
    if (environment.production) {
      this.dataURL = "/angular8-d3/assets/data/chart-data.json";
    } else {
      this.dataURL = "/assets/data/chart-data.json";
    }
  }

  fetchChartData() {
    return d3Fetch.json(this.dataURL);
  }
}
