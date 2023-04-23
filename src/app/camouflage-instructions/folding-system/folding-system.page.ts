import { Component, OnInit } from '@angular/core';
import { SystemInstructionsData } from '../models/system-instructions-data.model';
import { Observable } from 'rxjs';
import { SystemInstructionsDataService } from '../critical-considerations/services/system-instructions-data.service';

@Component({
  selector: 'app-folding-system',
  templateUrl: './folding-system.page.html',
  styleUrls: ['./folding-system.page.scss'],
})
export class FoldingSystemPage implements OnInit {

  foldingUpSystemData$!: Observable<SystemInstructionsData[]>
  constructor(private systemDataService: SystemInstructionsDataService) { }

  ngOnInit() {
    this.foldingUpSystemData$ = this.systemDataService.getFoldingUpSystemData()

  }

}
