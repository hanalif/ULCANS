import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-select-box-item',
  templateUrl: './select-box-item.component.html',
  styleUrls: ['./select-box-item.component.scss'],
})
export class SelectBoxItemComponent implements OnInit {
  @ViewChild('selectBoxContent', { read: TemplateRef<any> }) selectBoxContent!: TemplateRef<any>;

  constructor() { }

  ngOnInit() {}

}
