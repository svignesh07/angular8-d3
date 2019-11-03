import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutComponent } from './about.component';
import { SocialIconsComponent } from '../shared/social-icons/social-icons.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AboutComponent, SocialIconsComponent],
      imports: [ BrowserAnimationsModule ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the social-icons component', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-social-icons')).not.toBe(null);
  });

});
