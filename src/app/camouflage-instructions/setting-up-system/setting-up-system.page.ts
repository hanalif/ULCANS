import { Component, OnInit } from '@angular/core';
import { SystemInstructionsDataService } from '../../services/system-instructions-data.service';
import { SystemInstructionsData } from '../../models/system-instructions-data.model';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-setting-up-system',
  templateUrl: './setting-up-system.page.html',
  styleUrls: ['./setting-up-system.page.scss'],
})
export class SettingUpSystemPage implements OnInit {
  settingUpSystemData$!: Observable<SystemInstructionsData[]>
  constructor(private systemDataService: SystemInstructionsDataService) { }

  ngOnInit() {
    this.settingUpSystemData$ = this.systemDataService.getSettingUpSystemData()
  }

  // scrollToElement($element: HTMLElement): void {
  //   $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  // }

}
