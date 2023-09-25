import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tab-item',
  templateUrl: './tab-item.component.html',
  styleUrls: ['./tab-item.component.scss'],
})
export class TabItemComponent implements OnInit {
  @ViewChild('tabItemHeader', { read: TemplateRef<any> }) tabItemHeader!: TemplateRef<any>;
  @ViewChild('tabItemBody', { read: TemplateRef<any> }) tabItemBody!: TemplateRef<any>;

  constructor() { }

  ngOnInit() {}

}
