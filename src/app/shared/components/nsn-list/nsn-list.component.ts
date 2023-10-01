import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PORVariant } from 'src/app/configurations/environments-and-types/models/por-variant.model';

@Component({
  selector: 'app-nsn-list',
  templateUrl: './nsn-list.component.html',
  styleUrls: ['./nsn-list.component.scss'],
})
export class NsnListComponent implements OnInit {
  @Input() nsnsList!: PORVariant[];
  changSrcs: string[] = ['assets/imgs/environments/png-small/check-mark.png', 'assets/imgs/environments/png-small/check-mark-greyBG.png'];
  wideScreenTitles: string[] = ['', 'Type', 'NSN', 'Description', 'Pattern'];
  mobileTitles: string[]= ['SideA', 'NSN' ,'Description','SideB', 'NSN' ,'description']
  @Output() selectedPORIndex = new EventEmitter<number>();
  @Input() porIndexClicked!: number;
  @Input() displayMode!: string;


  constructor() { }

  ngOnInit() {}

  onPORClick(index:number){
    this.porIndexClicked = index;
    this.selectedPORIndex.emit(index);
  }

}


