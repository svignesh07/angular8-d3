import { Component } from '@angular/core';
import {trigger, transition, style, animate, query, stagger} from '@angular/animations';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [ // each time the binding value changes
        query(':enter', [
          style({ opacity: 0 }),
          stagger(500, [
            animate('0.5s', style({ opacity: 1 }))
          ])
        ])
      ])
    ])
  ]
})
export class AboutComponent {
  items = {};

  showItems() {
    this.items = {"Front end framework": "Angular 8",
                  "Script": "TypeScript, ES6",
                  "Responsive Framework": "Bootstrap 4",
                  "Charting Library": "D3 V5",
                  "Testing Framework": "Jasmine, Karma(test runner)",
                  "CSS Preprocessor": "SCSS"};
  }

  constructor() {
    this.showItems();
  }
}
