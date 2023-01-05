import { Component, ContentChildren, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-accordion-item',
  templateUrl: './accordion-item.component.html',
  styleUrls: ['./accordion-item.component.scss'],
})
export class AccordionItemComponent implements OnInit {
  @ViewChild('accordionItemHeader', { read: TemplateRef<any> }) accordionItemHeader!: TemplateRef<any>;
  @ViewChild('accordionItemBody', { read: TemplateRef<any> }) accordionItemBody!: TemplateRef<any>;
  // isOpened = false;

  constructor() { }

  ngOnInit() {}

}
