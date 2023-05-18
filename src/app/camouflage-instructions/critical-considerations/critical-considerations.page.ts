import { Component, OnInit } from '@angular/core';
import { SystemInstructionsDataService } from '../../services/system-instructions-data.service';
import { Observable } from 'rxjs';
import { SystemInstructionsData } from '../../models/system-instructions-data.model';

@Component({
  selector: 'app-critical-considerations',
  templateUrl: './critical-considerations.page.html',
  styleUrls: ['./critical-considerations.page.scss'],
})
export class CriticalConsiderationsPage implements OnInit {
  criticalConsiderationsData$!: Observable<SystemInstructionsData[]>

  constructor(private systemDataService: SystemInstructionsDataService) { }

  ngOnInit() {
    this.criticalConsiderationsData$ = this.systemDataService.getCriticalConsidarationsData();
  }

}
