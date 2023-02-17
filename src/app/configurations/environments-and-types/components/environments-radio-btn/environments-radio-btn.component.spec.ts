import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnvironmentsRadioBtnComponent } from './environments-radio-btn.component';

describe('EnvironmentsRadioBtnComponent', () => {
  let component: EnvironmentsRadioBtnComponent;
  let fixture: ComponentFixture<EnvironmentsRadioBtnComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvironmentsRadioBtnComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnvironmentsRadioBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
