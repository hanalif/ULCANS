import { Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList, SimpleChanges } from '@angular/core';
import { TabItemComponent } from './tab-item/tab-item.component';
import { DisplayHeadersMode } from './models/display-headers-mode';
import { PatternsSelections } from '../../models/patterns-selections.enum';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent implements OnInit {
  @ContentChildren(TabItemComponent) tabItems: QueryList<TabItemComponent> = new QueryList<TabItemComponent>;
  @Output() tabItemClicked = new EventEmitter<number>();
  @Input() openedItemIndex: number = 0;
  @Input() displayMode!: DisplayHeadersMode;


  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    let openedItemIndex: PatternsSelections = changes['openedItemIndex'].currentValue;
    let prevopenedItemIndex: PatternsSelections = changes['openedItemIndex'].previousValue;
    if(openedItemIndex === prevopenedItemIndex){
      return;
    }

  }



  onTabItemClicked(itemIndex: number){
    this.openedItemIndex = itemIndex;
    this.tabItemClicked.emit(this.openedItemIndex);

  }


}
