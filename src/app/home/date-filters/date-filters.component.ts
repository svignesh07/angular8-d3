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
    // Need to write it without a setTimeout
    setTimeout(()=>{
      this.date_filter = "daily";
      this.dateFilterChangeEvent.emit(this.date_filter);
    },300)

  }

  changeFilter(value) {
    // Emit only if the value is different from the current value
    if(value !== this.date_filter) {
      this.date_filter = value;
      this.dateFilterChangeEvent.emit(value);
    }
  }

}
