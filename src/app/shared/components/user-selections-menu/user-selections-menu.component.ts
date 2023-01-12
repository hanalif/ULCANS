import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AssetForDisplay } from '../../models/asset-for-display';
import { FtToMPipe } from '../../pipes/ft-to-m.pipe';
import { UserSelectionService } from '../../services/user-selection.service';
import { PdfPageComponent } from '../pdf-page/pdf-page.component';

@Component({
  selector: 'app-user-selections-menu',
  templateUrl: './user-selections-menu.component.html',
  styleUrls: ['./user-selections-menu.component.scss'],
})
export class UserSelectionsMenuComponent implements OnInit, OnDestroy {
  assetsForPdfSubscription!: Subscription;
  assetsForDisplay!: AssetForDisplay[];
  areThereAssetsToDisplay: boolean = false;
  currPlatform!: string | string[];



  constructor(
    private userSelectionService: UserSelectionService,
    private measurmentsPipe: FtToMPipe,
    private viewContainerRef: ViewContainerRef,
    public plt: Platform,
    ) { }

  ngOnInit() {
    this.assetsForPdfSubscription = this.userSelectionService.getAssetsForPdf().subscribe(assetsForPdf=>{
      let assetsForDisplay = this.userSelectionService.getAssetsForDisplay(assetsForPdf);
      if(assetsForDisplay.length === -1 || assetsForDisplay.length === 0 ){
        this.areThereAssetsToDisplay = false;
      }else{
        this.areThereAssetsToDisplay = true;
        this.assetsForDisplay = assetsForDisplay;
      }
    });

    this.currPlatform = this.plt.platforms();


  }

  ngOnDestroy(): void {
    this.assetsForPdfSubscription?.unsubscribe()

  }

  onDownloadPdf(){

    console.log('from cmp:', this.currPlatform)

    if(this.assetsForDisplay.length === 0 || this.assetsForDisplay.length === -1){
      return
    }

    let  htmlToPdfContent = this.viewContainerRef.createComponent(PdfPageComponent);
       htmlToPdfContent.setInput('assetsForDisplay', this.assetsForDisplay);

   this.userSelectionService.downloadPdf(htmlToPdfContent, this.currPlatform);
  }
}
