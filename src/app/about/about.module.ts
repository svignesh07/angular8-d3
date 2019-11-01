import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { SocialIconsComponent } from '../shared/social-icons/social-icons.component';


@NgModule({
  entryComponents: [SocialIconsComponent],
  imports: [CommonModule, AboutRoutingModule],
  declarations: [AboutComponent, SocialIconsComponent],
  exports: [SocialIconsComponent]
})
export class AboutModule {}
