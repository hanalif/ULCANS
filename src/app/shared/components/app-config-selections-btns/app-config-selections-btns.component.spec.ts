import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AppConfigSelectionsBtnsComponent } from './app-config-selections-btns.component';

describe('AppConfigSelectionsBtnsComponent', () => {
  let component: AppConfigSelectionsBtnsComponent;
  let fixture: ComponentFixture<AppConfigSelectionsBtnsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppConfigSelectionsBtnsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AppConfigSelectionsBtnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
