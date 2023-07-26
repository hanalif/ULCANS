import { AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, QueryList, SimpleChanges } from '@angular/core';
import { Animations } from 'src/app/angular-animations/animations';
import { AccordionItemComponent } from './accordion-item/accordion-item.component';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  animations: [Animations.slidesDownAnimation]
})
export class AccordionComponent implements OnInit, OnChanges, OnDestroy {
  @ContentChildren(AccordionItemComponent) accordionItems: QueryList<AccordionItemComponent> = new QueryList<AccordionItemComponent>;
  @Input() initialOpenIndex: number[] = [];
  @Output() accordionItemClicked = new EventEmitter<number>()
  // openedItemIndex: number | null = null;
  openedItemsIndexesMap: any = {};

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.initialOpenIndex.length != 0) {
        for(let i = 0; i < this.initialOpenIndex.length; i++){
          this.openedItemsIndexesMap[this.initialOpenIndex[i]] = this.initialOpenIndex[i];
        }

    }else{
      this.openedItemsIndexesMap = {};
    }
  }

  ngOnInit() {


  }


  onAccordionItemClicked(itemIndex: number) {
    const indexToRemove = this.openedItemsIndexesMap[itemIndex];
    if(indexToRemove !== undefined){
      delete this.openedItemsIndexesMap[itemIndex];
    } else{
      this.openedItemsIndexesMap[itemIndex] = itemIndex;
    }
    this.accordionItemClicked.emit(itemIndex);
    // this.openedItemIndex = this.openedItemIndex !== itemIndex ? itemIndex : null;
  }

  ngOnDestroy(): void {
    this.openedItemsIndexesMap = {};
  }
}
