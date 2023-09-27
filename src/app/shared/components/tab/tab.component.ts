import { Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList } from '@angular/core';
import { TabItemComponent } from './tab-item/tab-item.component';
import { DisplayHeadersMode } from './models/display-headers-mode';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent implements OnInit {
  @ContentChildren(TabItemComponent) tabItems: QueryList<TabItemComponent> = new QueryList<TabItemComponent>;
  @Output() tabItemClicked = new EventEmitter<number>();
  openedItemsIndexesMap: any = {};
  openedItemIndex: number = 0;
  @Input() displayMode!: DisplayHeadersMode;


  constructor() { }

  ngOnInit() {}

  onTabItemClicked(itemIndex: number){
    this.openedItemIndex = this.openedItemIndex !== itemIndex ? itemIndex : 0;
    this.tabItemClicked.emit(itemIndex);

  }



}
