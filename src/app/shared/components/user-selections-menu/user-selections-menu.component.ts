import {  Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Platform } from '@ionic/angular';
import html2canvas from 'html2canvas';
import {  Observable, Subscription } from 'rxjs';
import { AssetForDisplay } from '../../models/asset-for-display';
import { FtToMPipe } from '../../pipes/ft-to-m.pipe';
import { UserSelectionService } from '../../services/user-selection.service';
import JSPDF from 'jspdf';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File, IWriteOptions } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-user-selections-menu',
  templateUrl: './user-selections-menu.component.html',
  styleUrls: ['./user-selections-menu.component.scss'],
})
export class UserSelectionsMenuComponent implements OnInit, OnDestroy {
  @ViewChild('mobileCardsWrapper') mobileEl!: ElementRef<HTMLImageElement>;
  @ViewChild('wideScreenCardsWrapper') wideScreenEl!: ElementRef<HTMLImageElement>;


  assetsForPdfSubscription!: Subscription;
  assetsForDisplay!: AssetForDisplay[];
  areThereAssetsToDisplay: boolean = false;
  currPlatforms!: string[];
  isProcessingPdf$!: Observable<boolean>;
  tableHeaderTitles: string[] = ['Configuration Type', 'Asset', 'Side A', 'Side B', ' Type', ''];



  constructor(
    private userSelectionService: UserSelectionService,
    private measurmentsPipe: FtToMPipe,
    private viewContainerRef: ViewContainerRef,
    public plt: Platform,
    private file: File,
    private fileOpener: FileOpener,
    ) { }

  ngOnInit() {
    this.assetsForPdfSubscription = this.userSelectionService.assetsForPdf$.subscribe(assetsForPdf=>{
      let assetsForDisplay = this.userSelectionService.getAssetsForDisplay(assetsForPdf);
      if(assetsForDisplay.length === -1 || assetsForDisplay.length === 0 ){
        this.assetsForDisplay = [];
        this.areThereAssetsToDisplay = false;
      }else{
        console.log(assetsForDisplay);
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

  onDeleteSelection(userSlectionId: string | undefined){
    let userSelectionId = userSlectionId as string;
    this.userSelectionService.removeUserSelection(userSelectionId);
  }

  onDownloadPdf(){

    let platform = this.checkPlatform(this.currPlatforms);

    if(platform.desktop){
      this.createImgFromCanvas(this.wideScreenEl, false);
    }
    if(platform.mobileWeb){
      this.createImgFromCanvas(this.mobileEl, false);
    }

    if(platform.mobile){
      this.createImgFromCanvas(this.mobileEl, true);

    }






  //   if(this.assetsForDisplay.length === 0 || this.assetsForDisplay.length === -1){
  //     return
  //   }

  //   let  htmlToPdfContent = this.viewContainerRef.createComponent(PdfPageComponent);
  //      htmlToPdfContent.setInput('assetsForDisplay', this.assetsForDisplay);

  //  this.userSelectionService.downloadPdf(htmlToPdfContent, this.currPlatforms);
  }

  checkPlatform(currPlatforms: string[]){
    let isCurrPlatformDesktop: boolean = false;
    let isCurrPlatformMobileWeb: boolean = false;
    let isCurrPlatformMobile: boolean = false;
    for(let i = 0; i< currPlatforms.length; i++){
        if(currPlatforms[i] === "desktop"){
          isCurrPlatformDesktop = true;
        } else if(currPlatforms[i] === "mobileweb"){
          isCurrPlatformMobileWeb = true;
        }
        else{
          isCurrPlatformMobile = true;
        }
      }
      return {desktop: isCurrPlatformDesktop, mobileWeb: isCurrPlatformMobileWeb, mobile: isCurrPlatformMobile};

   }

   createImgFromCanvas(el:any, isMobile: boolean){
    html2canvas(el.nativeElement).then((canvas=>{
      const imgData = canvas.toDataURL('image/jpeg');
      const pdf = new JSPDF({
        orientation: 'portrait'
      })

      const imageProps = pdf.getImageProperties(imgData);
      const pdfw = pdf.internal.pageSize.getWidth();
      const pdfh = (imageProps.height * pdfw) / imageProps.width;
      pdf.addImage(imgData, 'PNG', 0,0, pdfw, pdfh);
      if(!isMobile){
        pdf.save();
      }else{
        let blobPdf = new Blob([pdf.output('blob')], {type: 'application/pdf'});
        this.file.writeFile(this.file.dataDirectory, 'output.pdf', blobPdf, {replace: true}).then(fileEntry=>{
          this.fileOpener.open(this.file.dataDirectory + 'output.pdf', 'application/pdf');
        })
      }
    }))

   }


 }


