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
    this.items = {"Technologies": "Angular 8, Bootstrap 4, D3 V5, Jasmine, Karma",
                  "Javascript": "ES6, TypeScript, Bootstrap 4, D3 V5, Jasmine, Karma",
                  "Responsive Framework": "Bootstrap 4",
                  "Testing Framework": "Jasmine, Karma(test runner)",
                  "CSS Preprocessor": "SCSS"};
  }

  constructor() {
    this.showItems();
  }
}
