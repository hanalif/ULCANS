import { Component, Input, OnInit } from '@angular/core';
import { PORVariant } from '../../models/por-variant.model';


@Component({
  selector: 'app-por-selections',
  templateUrl: './por-selections.component.html',
  styleUrls: ['./por-selections.component.scss'],
})
export class PorSelectionsComponent implements OnInit {
  @Input() nsnsList!: PORVariant;
  constructor() { }

  ngOnInit() {}

}
