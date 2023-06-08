import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SystemInstructionsDataService } from '../../services/system-instructions-data.service';
import { Observable, Subscription } from 'rxjs';
import { SystemInstructionsData } from '../../models/system-instructions-data.model';
import { IndexesForAccordion } from 'src/app/shared/models/indexes-for-accordion.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-critical-considerations',
  templateUrl: './critical-considerations.page.html',
  styleUrls: ['./critical-considerations.page.scss'],
})
export class CriticalConsiderationsPage implements OnInit, OnDestroy {
  indexesForAccordion!: IndexesForAccordion;
  criticalConsiderationsData$!: Observable<SystemInstructionsData[]>
  indexesForAccordionSubscription!: Subscription;

  constructor(
    private systemDataService: SystemInstructionsDataService,
    private route: ActivatedRoute,
    private cd:ChangeDetectorRef) { }


  ngOnInit() {
    this.indexesForAccordionSubscription = this.route.data.subscribe((data)=>{
      this.indexesForAccordion = data['indexesForAccordion'];
      this.cd.detectChanges();
  });
    this.criticalConsiderationsData$ = this.systemDataService.getCriticalConsidarationsData();
  }

  ngOnDestroy(): void {
    this.indexesForAccordionSubscription.unsubscribe();
  }

}
