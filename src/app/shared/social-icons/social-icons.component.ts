import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-social-icons',
  templateUrl: './social-icons.component.html',
  styleUrls: ['./social-icons.component.scss']
})
export class SocialIconsComponent implements OnInit {

  sites = {'github': "https://github.com/svignesh07", 'linkedin': "https://www.linkedin.com/in/vigneshselvaraj"}

  constructor() { }

  ngOnInit() {
  }

}
