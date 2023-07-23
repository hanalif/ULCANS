import { Component, OnInit } from '@angular/core';
import { SystemInstructionsData } from '../../models/system-instructions-data.model';
import { Observable } from 'rxjs';
import { SystemInstructionsDataService } from '../../services/system-instructions-data.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-folding-system',
  templateUrl: './folding-system.page.html',
  styleUrls: ['./folding-system.page.scss'],
})
export class FoldingSystemPage implements OnInit {

  foldingUpSystemData$!: Observable<SystemInstructionsData[]>
  constructor(private systemDataService: SystemInstructionsDataService, private route: Router) { }

  ngOnInit() {
    this.foldingUpSystemData$ = this.systemDataService.getFoldingUpSystemData()

  }

  onLink(link: string ,index:number[], innerIndex: number[] = []){

    console.log(index);
    console.log(innerIndex);


    this.route.navigate([link] , {queryParams: {index: index.join(','), innerIndex: innerIndex.join(',')}});
  }

}
