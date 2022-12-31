import { Component, OnInit } from '@angular/core';
import { IndexNode } from 'src/app/shared/cmps/page-index/models/index-node.model';

@Component({
  selector: 'app-setting-up-system',
  templateUrl: './setting-up-system.page.html',
  styleUrls: ['./setting-up-system.page.scss'],
})
export class SettingUpSystemPage implements OnInit {
  indexNodes: IndexNode[] = [
    {
      id: 'net-selection',
      mainTitle: 'NET ASSEMBLY SELECTION'
    },
    {
      id: 'net-preparation',
      mainTitle: 'NET ASSEMBLY PREPARATION'
    },
    {
      id: 'folding-net',
      mainTitle: 'FOLDING NET ASSEMBLY '
    },
    {
      id: 'deployment-process',
      mainTitle: 'Deployment Process'
    }
  ]


  constructor() { }

  ngOnInit() {
  }

  scrollToElement($element: HTMLElement): void {
    console.log($element);
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

}
