import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { Platform } from '@ionic/angular';
import { asyncScheduler, Observable, Subscription } from 'rxjs';
import { AssetForDisplay } from '../../models/asset-for-display';
import { FtToMPipe } from '../../pipes/ft-to-m.pipe';
import { UserSelectionService } from '../../services/user-selection.service';
import { PdfPageComponent } from '../pdf-page/pdf-page.component';
import JSPDF from 'jspdf';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-user-selections-menu',
  templateUrl: './user-selections-menu.component.html',
  styleUrls: ['./user-selections-menu.component.scss'],
})
export class UserSelectionsMenuComponent implements OnInit, OnDestroy {
  assetsForPdfSubscription!: Subscription;
  assetsForDisplay!: AssetForDisplay[];
  areThereAssetsToDisplay: boolean = false;
  currPlatforms!: string[];
  isProcessingPdf$!: Observable<boolean>



  constructor(
    private userSelectionService: UserSelectionService,
    private measurmentsPipe: FtToMPipe,
    private viewContainerRef: ViewContainerRef,
    public plt: Platform,

    private file: File,
    private fileOpener: FileOpener,

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
      this.currPlatforms = this.plt.platforms();
      this.isProcessingPdf$ = this.userSelectionService.getIsProcessingPdf()
  }

  ngOnDestroy(): void {
    this.assetsForPdfSubscription?.unsubscribe()

  }

  // onDownloadPdf(){


  //   if(this.assetsForDisplay.length === 0 || this.assetsForDisplay.length === -1){
  //     return
  //   }

  //   let  htmlToPdfContent = this.viewContainerRef.createComponent(PdfPageComponent);
  //      htmlToPdfContent.setInput('assetsForDisplay', this.assetsForDisplay);

  //  this.userSelectionService.downloadPdf(htmlToPdfContent, this.currPlatforms);
  // }

  onDownloadPdf() {
    let  htmlToPdfContent = this.viewContainerRef.createComponent(PdfPageComponent);
      //  htmlToPdfContent.setInput('assetsForDisplay', this.assetsForDisplay);
       htmlToPdfContent.setInput('description', 'lorem hrejkf ejrkl vjekl ejfkl fjekl fjrtkl rjtkl rtjkl')


       asyncScheduler.schedule(() => {
         const htmlString = htmlToPdfContent.location.nativeElement.innerHTML;
         htmlToPdfContent.destroy();

         var doc = new JSPDF();
         doc.html(htmlString, {
         callback: ((doc: JSPDF) => {
           if(this.plt.is("desktop" || "mobileweb")){
             doc.save("output.pdf");
           }else{
             let blobPdf = new Blob([doc.output('blob')], {type: 'application/pdf'});
             this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blobPdf, { replace: true }).then(fileEntry => {
             this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
             })
           }
         }).bind(this),
         margin: [10,10,10,10],
         autoPaging: 'text',
         x: 0,
         y: 0,
         width: 190,
         windowWidth: 675
       });
     });


   }

 }


