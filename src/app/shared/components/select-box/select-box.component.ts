import { Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList, ViewEncapsulation } from '@angular/core';
import { SelectBoxItemComponent } from './select-box-item/select-box-item.component';

@Component({
  selector: 'app-select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.scss']
})
export class SelectBoxComponent implements OnInit {
  @ContentChildren(SelectBoxItemComponent) selectBoxItems: QueryList<SelectBoxItemComponent> = new QueryList<SelectBoxItemComponent>;
  @Output() selectBoxItemClicked = new EventEmitter<number>();
  clickedItemIndex: number = -1;
  changSrcs: string[] = ['assets/imgs/environments/png-small/check-mark.png', 'assets/imgs/environments/png-small/check-mark-greyBG.png']
  constructor() { }

  ngOnInit() {}

  onSelectBoxItemClicked(itemIndex: number){
    this.clickedItemIndex = this.clickedItemIndex !== itemIndex ? itemIndex : 0;
    this.selectBoxItemClicked.emit(this.clickedItemIndex);
  }

}
