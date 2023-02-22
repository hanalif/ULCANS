import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AssetForDisplay } from '../../models/asset-for-display';

@Component({
  selector: 'app-pdf-page',
  templateUrl: './pdf-page.component.html',
  styleUrls: ['./pdf-page.component.scss'],
})
export class PdfPageComponent implements OnInit, OnChanges {
  // @Input() assetsForDisplay!: AssetForDisplay[];
  @Input() description!: string;
  isHidden: boolean = false;
  STYLES: any = {
    MAIN_CONTAINER: 'background:red;',
    ITEM_BOX: 'color:red;',
  };

  constructor(private cd: ChangeDetectorRef) { }


  ngOnChanges(changes: SimpleChanges): void {
    this.cd.detectChanges();

  }

  ngOnInit() {
    console.log('pdf page')
  }

}
