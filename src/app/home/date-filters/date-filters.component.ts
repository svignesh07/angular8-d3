import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-date-filters',
  templateUrl: './date-filters.component.html',
  styleUrls: ['./date-filters.component.scss']
})
export class DateFiltersComponent implements OnInit {

  date_filter: any;
  @Output() dateFilterChangeEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    // Emit the initial date_filter value to Home Component
    setTimeout(()=>{
      this.date_filter = "3_months";
      this.dateFilterChangeEvent.emit(this.date_filter);
    },300)

  }

  changeFilter(value) {
    this.date_filter = value;
    this.dateFilterChangeEvent.emit(value);
  }

}
