import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConfigurationsAndEnviormentsPage } from './configurations-and-enviorments.page';

describe('ConfigurationsAndEnviormentsPage', () => {
  let component: ConfigurationsAndEnviormentsPage;
  let fixture: ComponentFixture<ConfigurationsAndEnviormentsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurationsAndEnviormentsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigurationsAndEnviormentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
