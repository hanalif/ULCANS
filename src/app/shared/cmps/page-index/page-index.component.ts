import { Component, Input, OnInit } from '@angular/core';
import { IndexNode } from './models/index-node.model';

@Component({
  selector: 'app-page-index',
  templateUrl: './page-index.component.html',
  styleUrls: ['./page-index.component.scss'],
})
export class PageIndexComponent implements OnInit {
  @Input() indexNodes!: IndexNode[];
  constructor() { }

  ngOnInit() {}

}
