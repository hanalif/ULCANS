import { AfterContentInit, Component, ContentChildren, OnInit, QueryList } from '@angular/core';
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
  openedItemIndex: number | null = null;
  constructor() { }

  ngOnInit() {}

  ngAfterContentInit(): void {

  }

  onAccordionItemClicked(itemIndex: number) {
    // this.accordionItems.get(itemIndex)?.isOpened = !this.accordionItems.get(itemIndex)?.isOpened;
    this.openedItemIndex = this.openedItemIndex !== itemIndex ? itemIndex : null;
  }
}
