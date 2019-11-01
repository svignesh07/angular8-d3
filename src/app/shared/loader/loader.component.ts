import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  @Input() is_loading = false;
  @Input() message: string | undefined;

  constructor() {}

  ngOnInit() {}
}
