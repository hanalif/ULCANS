import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CamouflageInstructionsIntroPage } from './camouflage-instructions-intro.page';

describe('CamouflageInstructionsIntroPage', () => {
  let component: CamouflageInstructionsIntroPage;
  let fixture: ComponentFixture<CamouflageInstructionsIntroPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CamouflageInstructionsIntroPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CamouflageInstructionsIntroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
