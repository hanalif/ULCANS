import { AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import { Animations } from 'src/app/angular-animations/animations';
import { AccordionItemComponent } from './accordion-item/accordion-item.component';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  animations: [Animations.slidesDownAnimation]
})
export class AccordionComponent implements OnInit, AfterContentInit {
  @ContentChildren(AccordionItemComponent) accordionItems: QueryList<AccordionItemComponent> = new QueryList<AccordionItemComponent>;
  @Input() initialOpenIndex: number | null = null;
  // openedItemIndex: number | null = null;
  openedItemsIndexesMap: any = {};

  constructor() { }

  ngOnInit() {
    if (this.initialOpenIndex !== null) {
      this.openedItemsIndexesMap[this.initialOpenIndex] = this.initialOpenIndex;
    }
  }

    ngAfterContentInit(): void {
  }

  onAccordionItemClicked(itemIndex: number) {
    const indexToRemove = this.openedItemsIndexesMap[itemIndex];
    if(indexToRemove !== undefined){
      delete this.openedItemsIndexesMap[itemIndex];
    } else{
      this.openedItemsIndexesMap[itemIndex] = itemIndex;
    }
    console.log(this.openedItemsIndexesMap);
    // this.openedItemIndex = this.openedItemIndex !== itemIndex ? itemIndex : null;
  }
}
