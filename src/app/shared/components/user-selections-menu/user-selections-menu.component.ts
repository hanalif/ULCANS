import {  Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AssetForDisplay } from '../../models/asset-for-display';
import { FtToMPipe } from '../../pipes/ft-to-m.pipe';
import { UserSelectionService } from '../../services/user-selection.service';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';
import { DatePipe } from '@angular/common';
import 'jspdf-autotable';
import autoTable, { CellHookData } from 'jspdf-autotable';
import JSPDF, { jsPDF } from 'jspdf';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-selections-menu',
  templateUrl: './user-selections-menu.component.html',
  styleUrls: ['./user-selections-menu.component.scss'],
  providers: [DatePipe]
})
export class UserSelectionsMenuComponent implements OnInit, OnDestroy {
  @ViewChild('mobileCardsWrapper') mobileEl!: ElementRef<HTMLImageElement>;
  @ViewChild('wideScreenCardsWrapper') wideScreenEl!: ElementRef<HTMLImageElement>;


  assetsForPdfSubscription!: Subscription;
  assetsForDisplay!: AssetForDisplay[];
  areThereAssetsToDisplay: boolean = false;
  currPlatforms!: string[];
  isProcessingPdf: boolean = false;
  tableHeaderTitles:  string[] = ['Configuration Type', 'Asset', 'Side A', 'Side B',' Type', ''];
  tableHeaderTitlesForPdf: string[] = ['Configuration Type', 'Asset', 'Side A', 'Pattern', 'Side B', 'Pattern',' Type'];
  date = this.transformDate(new Date);

  transformDate(date: Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }



  constructor(
    private userSelectionService: UserSelectionService,
    private measurmentsPipe: FtToMPipe,
    public plt: Platform,
    private file: File,
    private fileOpener: FileOpener,
    private datePipe: DatePipe,
    private alertController: AlertController
    ) { }

  ngOnInit() {
    this.assetsForPdfSubscription = this.userSelectionService.assetsForPdf$.subscribe(assetsForPdf=>{
      let assetsForDisplay = this.userSelectionService.getAssetsForDisplay(assetsForPdf);
      if(assetsForDisplay.length === -1 || assetsForDisplay.length === 0 ){
        this.assetsForDisplay = [];
        this.areThereAssetsToDisplay = false;
      }else{
        this.areThereAssetsToDisplay = true;
        this.assetsForDisplay = assetsForDisplay;
      }
    });
      this.currPlatforms = this.plt.platforms();
  }

  ngOnDestroy(): void {
    this.assetsForPdfSubscription?.unsubscribe()
  }

  onDeleteSelection(userSlectionId: string | undefined){
    let userSelectionId = userSlectionId as string;
    this.userSelectionService.removeUserSelection(userSelectionId);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Your Pdf Is Generated.',
      cssClass: 'custom-alert',
    });
  }
  onDownloadPdf(){


      let platform = this.checkPlatform(this.currPlatforms);

      const doc = new jsPDF('p', 'pt','a4',true);
      this.isProcessingPdf = true;

      autoTable(doc, {
        html: '.table1',
        didDrawCell: (data: any) => {
          if(data.cell.raw.id === 'logo'){
              var td = data.cell.raw;
              var img = td.getElementsByTagName('img')[0];
              doc.addImage(img.src, 'JPEG',data.cell.x,  data.cell.y, data.cell.contentWidth + 30, data.cell.contentHeight);
            }
        },
        theme: 'plain',
      });

      autoTable(doc, {
        body: [
          [
            {
              content: `${this.date}`,
              styles: {
                halign: 'left'
              },
            }
          ],
        ],
        theme: 'plain'
      });

      autoTable(doc, {
        body: [
          [
            {
              content:'Fibrotex'
              +'\n8 Hasivim Street, Petach Tikvah, Israel'
              +'\n+972 9 951 8830',
              styles: {
                halign: 'left'
              }
            }
          ],
        ],
        theme: 'plain'
      });

      autoTable(doc, {
        body: [
          [
            {
              content: 'ULCANS PREFERENCES',
              styles: {
                halign:'left',
                fontSize: 12
              }
            }
          ]
        ],
        theme: 'plain'
      });

      autoTable(doc, {
        html: '.table',
        bodyStyles: {
          valign: 'middle',
          cellWidth: 'wrap',
          halign: 'center',
          minCellHeight: 30,
          minCellWidth: 35
        },

        didDrawCell: (data: any) => {
          var cellId = data.cell.raw.id;
          if( cellId === 'imgEl'){
            var td = data.cell.raw;
            var img = td.getElementsByTagName('img')[0];
            doc.addImage(img.src, 'JPEG',data.cell.x + 2,  data.cell.y, data.cell.contentWidth + 16, data.cell.contentHeight, '', 'FAST' );
          }
          if(cellId === 'imgElSideA' || cellId === 'imgElSideB'){
            var td = data.cell.raw;
            var img = td.getElementsByTagName('img')[0];
            doc.addImage(img.src, 'JPEG',data.cell.x + 2,  data.cell.y, data.cell.contentWidth + 20, data.cell.contentHeight, '', 'FAST');
          }
        },
        theme: 'striped'

      });

      autoTable(doc, {
        body: [
          [
            {
              content: 'Important Note',
              styles: {
                halign: 'left',
                fontSize: 14
              }
            }
          ],
          [
            {

              content: 'Thank you for selecting your ULCANS preferences.'
              +'We would appreciate it if you could send the PDF to our office'
              +' and get in touch with our exceptional agent to discuss your choices further.',
              styles: {
                halign: 'left'
              }
            }
          ],
        ],
        theme: "plain"
      });

      autoTable(doc, {
        body: [
          [
            {
              content: 'Ultra Lightweight Camouflage Net System'
              +'The ability to conceal and protect forces against multi-spectral sensor threats.',
              styles: {
                halign: 'center'
              }
            }
          ]
        ],
        theme: "plain"
      });


      if(platform.desktop || platform.mobileWeb){
        return doc.save("output.pdf",{ returnPromise: true }).then(()=>{
          console.log('hello')
          this.isProcessingPdf = false;
          console.log(this.isProcessingPdf)
        })
      }


      if(platform.mobile){
        let blobPdf = new Blob([doc.output('blob')], {type: 'application/pdf'});
          this.file.writeFile(this.file.dataDirectory, 'output.pdf', blobPdf, {replace: true}).then(fileEntry=>{
            this.isProcessingPdf = false;
            this.fileOpener.open(this.file.dataDirectory + 'output.pdf', 'application/pdf');
          })
      }

      return

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



 }


