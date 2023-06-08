import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { SystemInstructionsData } from 'src/app/models/system-instructions-data.model';
import { UsefulInformationDataService } from 'src/app/services/useful-information.service';
import { IndexesForAccordion } from 'src/app/shared/models/indexes-for-accordion.model';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.page.html',
  styleUrls: ['./maintenance.page.scss'],
})
export class MaintenancePage implements OnInit {
  indexesForAccordion!: IndexesForAccordion;
  indexesForAccordionSubscription!: Subscription;

  maintenanceData$!: Observable<SystemInstructionsData[]>

  constructor(
    private usefulInformationService: UsefulInformationDataService,
    private route: ActivatedRoute,
    private cd:ChangeDetectorRef) { }

  ngOnInit() {
    this.indexesForAccordionSubscription = this.route.data.subscribe((data)=>{
      this.indexesForAccordion = data['indexesForAccordion'];
      this.cd.detectChanges();
  });
    this.maintenanceData$ = this.usefulInformationService.getMaintenanceData();
  }

  ngOnDestroy(): void {
    this.indexesForAccordionSubscription.unsubscribe();
  }

}
