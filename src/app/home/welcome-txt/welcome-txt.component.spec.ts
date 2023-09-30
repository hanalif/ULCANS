import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WelcomeTxtComponent } from './welcome-txt.component';

describe('WelcomeTxtComponent', () => {
  let component: WelcomeTxtComponent;
  let fixture: ComponentFixture<WelcomeTxtComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeTxtComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WelcomeTxtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
