import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PORVariant } from '../../models/por-variant.model';


@Component({
  selector: 'app-por-selections',
  templateUrl: './por-selections.component.html',
  styleUrls: ['./por-selections.component.scss'],
})
export class PorSelectionsComponent implements OnInit {
  @Input() nsnsList!: PORVariant[];
  changSrcs: string[] = ['assets/imgs/environments/png-small/check-mark.png', 'assets/imgs/environments/png-small/check-mark-greyBG.png'];
  wideScreenTitles: string[] = ['', 'Type', 'NSN', 'Description', 'Pattern'];
  mobileTitles: string[]= ['SideA', 'NSN' ,'Description','SideB', 'NSN' ,'description']
  @Output() selectedPORIndex = new EventEmitter<number>();
  @Input() porIndexClicked!: number;
  constructor() { }

  ngOnInit() {

  }

  onPORClick(index:number){
    this.porIndexClicked = index;
    this.selectedPORIndex.emit(index);
  }

}
