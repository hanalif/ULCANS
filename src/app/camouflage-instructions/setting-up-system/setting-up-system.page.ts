import { Component, OnInit } from '@angular/core';
import { SystemInstructionsDataService } from '../../services/system-instructions-data.service';
import { SystemInstructionsData } from '../../models/system-instructions-data.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-setting-up-system',
  templateUrl: './setting-up-system.page.html',
  styleUrls: ['./setting-up-system.page.scss'],
})
export class SettingUpSystemPage implements OnInit {
  settingUpSystemData$!: Observable<SystemInstructionsData[]>
  constructor(private systemDataService: SystemInstructionsDataService, private route: Router) { }

  ngOnInit() {
    this.settingUpSystemData$ = this.systemDataService.getSettingUpSystemData()
  }

  // scrollToElement($element: HTMLElement): void {
  //   $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  // }

  onLink(link: string ,index:number[], innerIndex: number[] = []){
    console.log(index);
    console.log(innerIndex);
    this.route.navigate([link] , {queryParams: {index: index.join(','), innerIndex: innerIndex.join(',')}});

  }

}
