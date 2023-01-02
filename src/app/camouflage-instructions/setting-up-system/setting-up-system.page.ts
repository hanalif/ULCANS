import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-setting-up-system',
  templateUrl: './setting-up-system.page.html',
  styleUrls: ['./setting-up-system.page.scss'],
})
export class SettingUpSystemPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  scrollToElement($element: HTMLElement): void {
    console.log($element);
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

}
