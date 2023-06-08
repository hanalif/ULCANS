import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { SystemInstructionsData } from 'src/app/models/system-instructions-data.model';
import { UsefulInformationDataService } from 'src/app/services/useful-information.service';
import { IndexesForAccordion } from 'src/app/shared/models/indexes-for-accordion.model';

@Component({
  selector: 'app-equipment-description',
  templateUrl: './equipment-description.page.html',
  styleUrls: ['./equipment-description.page.scss'],
})
export class EquipmentDescriptionPage implements OnInit {
  indexesForAccordion!: IndexesForAccordion;
  equipmentDescriptionData$!: Observable<SystemInstructionsData[]>
  indexesForAccordionSubscription!: Subscription;

  constructor(
    private usefulInformationService: UsefulInformationDataService,
    private route: ActivatedRoute,
    private cd:ChangeDetectorRef) { }

  ngOnInit() {
    this.indexesForAccordionSubscription = this.route.data.subscribe((data)=>{
      this.indexesForAccordion = data['indexesForAccordion'];
      this.cd.detectChanges();
  });
    this.equipmentDescriptionData$ = this.usefulInformationService.getEquipmentDescriptionData();
  }

  ngOnDestroy(): void {
    this.indexesForAccordionSubscription.unsubscribe();
  }



}
