import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectBoxItemComponent } from './select-box-item.component';

describe('SelectBoxItemComponent', () => {
  let component: SelectBoxItemComponent;
  let fixture: ComponentFixture<SelectBoxItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectBoxItemComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectBoxItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
