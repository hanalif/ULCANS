import { Component, Input, OnInit } from '@angular/core';
import { IndexNode } from '../models/index-node.model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  @Input() indexNodes!: IndexNode[];
  constructor() { }

  ngOnInit() {}

}
