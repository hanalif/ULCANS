import {  Component, OnDestroy, OnInit} from '@angular/core';
import { Platform } from '@ionic/angular';
import { AssetForDisplay } from '../../models/asset-for-display';
import { UserSelectionService } from '../../services/user-selection.service';
import { DatePipe } from '@angular/common';
import 'jspdf-autotable';
import autoTable, { } from 'jspdf-autotable';
import  { jsPDF } from 'jspdf';
import { AlertController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { MeasureType } from '../../models/measure-type.enum';
import { MenuCategoriesService } from '../../services/menu-categories.service';
import { Router } from '@angular/router';
import { UserSelections } from '../../models/user-selections.model';
import { AppConfirmationSelections } from 'src/app/app-configurations/app-configurations.enum';
import { AppConfigurationService } from 'src/app/app-configurations/app-configurations.service';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { FileSharer } from '@byteowls/capacitor-filesharer';
import { EnvironmentsService } from 'src/app/configurations/environments-and-types/services/environments.service';
import { PORVariant } from 'src/app/configurations/environments-and-types/models/por-variant.model';


@Component({
  selector: 'app-user-selections-menu',
  templateUrl: './user-selections-menu.component.html',
  styleUrls: ['./user-selections-menu.component.scss'],
  providers: [DatePipe]
})
export class UserSelectionsMenuComponent implements OnInit, OnDestroy {

  assetsForPdfSubscription!: Subscription;
  assetsForDisplay!: AssetForDisplay[];
  areThereAssetsToDisplay: boolean = false;
  currPlatforms!: string[];
  tableHeaderTitles:  string[] = ['Name', 'Length', 'Width', 'Height',  'Type', 'Hexagon', 'Rhombus','Width', 'Length', 'Area SQ', 'Poles', 'Pins' ,'Side A', 'Side B',' Type' ,''];
  wideScreenTitles: any = [{mainTitle: 'Asset', tableTitles: this.tableHeaderTitles.slice(0,4)}, {mainTitle: 'Configuration', tableTitles: this.tableHeaderTitles.slice(4,12)},{mainTitle: 'Patterns', tableTitles: ['sideA', 'Pattern Design', 'sideB','Pattern Design', 'Type'] }];
  configurationTitles: string[] = ['Type','Name', 'Hexagon', 'Rhombus', 'Width', 'Length', 'Area SQ', 'Poles', 'Pins'];
  patternsTitles: string[] = ['Side A', 'Pattern',  'Design' ,'Side B', 'Pattern',  'Design' ,' Type' ];
  assetTitles: string[] = ['Name', 'Length', 'Width', 'Height' ];
  wideScreenTitlesPOR: string[] = ['', 'Type', 'NSN', 'Description', 'Pattern'];
  mobileTitlesPOR: string[]= ['SideA', 'NSN' ,'Description','SideB', 'NSN' ,'description'];
  PORTitlesForPdf: string[] = ['Pattern', 'NSN', 'Type',''];

  nsnsList: PORVariant[] = [];

  userSelectionForPdf!: AssetForDisplay;

  date!: String | Date | null;

  public measureType: MeasureType = MeasureType.METERS;
  public MeasureType = MeasureType;
  public indexForTablePdf: number = -1;
  public loadingPdf = false;

  isDiabledSubscription!: Subscription;
  isDisabled!: boolean;

  currUserSelectionSubscription!: Subscription;
  currUserSelection!: UserSelections | null;

  public AppConfigSettings = AppConfirmationSelections;
  appConfigSettings!: AppConfirmationSelections;
  appConfigSettingsSubscription!: Subscription;





  constructor(
    private userSelectionService: UserSelectionService,
    public plt: Platform,
    private datePipe: DatePipe,
    private alertController: AlertController,
    private menuCategoriesService: MenuCategoriesService,
    private route: Router,
    private appConfigService: AppConfigurationService,
    public platform: Platform,
    public environmentsService: EnvironmentsService
    ) { }

  ngOnInit() {
    this.nsnsList = this.environmentsService.getPORListValue();

    this.appConfigSettingsSubscription = this.appConfigService.getCurrAppConfigSettings().subscribe(currAppSettings=>{
      this.appConfigSettings = currAppSettings;
      this.date = this.transformDate(new Date);
    });
    this.assetsForPdfSubscription = this.userSelectionService.userSelections$.subscribe(assetsForPdf=>{
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
    this.isDiabledSubscription = this.userSelectionService.getisDisabled().subscribe(isDisabled=> this.isDisabled = isDisabled);
      this.currUserSelectionSubscription = this.userSelectionService.getCurrUserSelectionValueAsObservable().subscribe(currUserSelection=>{
        this.currUserSelection = currUserSelection;
      })

  }

  transformDate(date: Date) {
    let dateGl = this.datePipe.transform(date, 'dd/MM/yyyy');
    let dateUs = this.datePipe.transform(date, 'MM/dd/yyyy');
    if(this.appConfigSettings === AppConfirmationSelections.GLOBAL){
      return dateGl;
    }
    if(this.appConfigSettings === AppConfirmationSelections.USA){
      return dateUs;
    }

    return date;

  }

  onEditAsset(assetId: string, $event: Event, isInList: boolean, userSelectionId: string | undefined){
    $event.stopPropagation();
    if(isInList){
      return;
    }

    this.route.navigate(['configurations', 'configuration-calaulator', assetId], {queryParams: {isFromUserSelectionsMenu: true, userSelectionToUpdateId: userSelectionId}});
    this.userSelectionService.setIsUserSelectionsMenuOpen(false);
  }

  onEditPatterns($event: Event, userSelectionId: string | undefined){
    $event.stopPropagation();

    this.route.navigate(['/configurations/environments-and-types'], {queryParams: {isFromUserSelectionsMenu: true, userSelectionToUpdateId: userSelectionId}});
    this.userSelectionService.setIsUserSelectionsMenuOpen(false);
  }

  onAccordionItem(index: number, userSelectionId: string | undefined, initialIndexes: number[]){
    let userSelectios: Partial<UserSelections>;
    let copyOfInitialIndexes = initialIndexes;
    let foundNumber = copyOfInitialIndexes.find(i => i == index);

    if(foundNumber != undefined){
      let foundIndex = copyOfInitialIndexes.findIndex(i => i == foundNumber);
      copyOfInitialIndexes.splice(foundIndex, 1);

    }else{
      copyOfInitialIndexes.push(index);
    }

    userSelectios = {
      initialIndexses: copyOfInitialIndexes
    }

    if(userSelectionId){
      this.userSelectionService.updateUserSelection(userSelectios, userSelectionId);
    }



  }

  ngOnDestroy(): void {
    this.assetsForPdfSubscription?.unsubscribe();
    this.isDiabledSubscription?.unsubscribe();
    this.currUserSelectionSubscription?.unsubscribe();
    this.appConfigSettingsSubscription.unsubscribe();
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

  onToCategoryIntro(categoryId:string){
    this.menuCategoriesService.setOpenMenuLinkMaping(categoryId);
    if(categoryId === 'MC2'){
      this.route.navigate(['camouflage-instructions']);
    }else{
      this.route.navigate(['useful-information']);
    }
    this.userSelectionService.setIsUserSelectionsMenuOpen(false);
  }


  //PDF Generator:

  onDownloadPdf(index: number){
    this.indexForTablePdf = index;
    this.userSelectionForPdf = this.assetsForDisplay[this.indexForTablePdf];

    setTimeout(() => this.exportToPdf(), 0);
  }

  exportToPdf() {
    let platform = this.checkPlatform(this.currPlatforms);

    const doc = new jsPDF('p', 'pt','a4',true);


    autoTable(doc, {
      bodyStyles: {
        minCellHeight: 52,
      },
      html: '.logo-table',
      didDrawCell: (data: any) => {
        if(data.cell.raw.id === 'logo'){
            var td = data.cell.raw;
            var img = td.getElementsByTagName('img')[0];
            doc.addImage(img.src, 'JPEG', data.cell.x,  data.cell.y , data.cell.contentWidth + 90, data.cell.contentHeight);
          }
      },
      theme: 'plain',
    });

    autoTable(doc, {
      useCss: true,
      html: '.date-link-table',
      didDrawCell: (data: any) => {

          if(data.cell.raw.id === 'link'){
            var td = data.cell.raw;
            var link = td.getElementsByTagName('a')[0];
            doc.link(data.cell.x,  data.cell.y , data.cell.contentWidth + 90, data.cell.contentHeight, {url: link.href});
          }
      },
      theme: 'plain',
    });


    autoTable(doc, {
      useCss: true,
      html: '.title-table',
      theme: 'plain',
    });

    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 3,
      body: [
        [
          {
            content: 'Asset:',
            styles: {
              halign: 'left',
              fontSize: 14
            }
          }
        ]
      ],
      theme: "plain"
    });

    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 3,
      html: '.asset-table',
      headStyles:{
        valign: 'middle',
        cellWidth: 'wrap',
        halign: 'left',
        minCellHeight: 30,
        minCellWidth: 40
      },
      bodyStyles: {
        valign: 'middle',
        cellWidth: 'wrap',
        halign: 'left',
        minCellHeight: 30,
        minCellWidth: 40
      },
      theme: 'striped'
    });


    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 10,
      body: [
        [
          {
            content: 'Configuration:',
            styles: {
              fontSize: 14,
              halign: 'left',
            }
          }
        ]
      ],
      theme: "plain"
    });

    if(!this.userSelectionForPdf.configuratoin){
      autoTable(doc, {
        startY: (doc as any).lastAutoTable.finalY + 1,
        body: [
          [
            {
              content: 'The size of your asset requires a custom configuration. Please contact us for more information.',
              styles: {
                fontSize: 11,
                halign: 'center',
              }
            }
          ]
        ],
        theme: "plain"
      });
    }


if(this.userSelectionForPdf.configuratoin){
  autoTable(doc, {
    startY: (doc as any).lastAutoTable.finalY + 3,
    html: '.config-table',
    headStyles:{
      valign: 'middle',
      cellWidth: 'wrap',
      halign: 'center',
      minCellHeight: 30,
      minCellWidth: 40
    },
    bodyStyles: {
      valign: 'middle',
      cellWidth: 'wrap',
      halign: 'center',
      minCellHeight: 30,
      minCellWidth: 40
    },

    didDrawCell: (data: any) => {
      var cellId = data.cell.raw?.id;
      if( cellId === 'imgEl'){
        var td = data.cell.raw;
        var img = td.getElementsByTagName('img')[0];
        doc.addImage(img.src, 'JPEG',data.cell.x + 2,  data.cell.y, data.cell.contentWidth + 16, data.cell.contentHeight, '', 'FAST' );
      }
    },
    theme: 'striped'
  });

  if(this.userSelectionForPdf.areSpecialPoles){
    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 1,
      body: [
        [
          {
            content: '* Special poles require',
            styles: {
              fontSize: 10,
              halign: 'left',
            }
          }
        ]
      ],
      theme: "plain"
    });
  }
}

    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 10,
      body: [
        [
          {
            content: 'Patterns:',
            styles: {
              fontSize: 12,
              halign: 'left'
            }
          }
        ]
      ],
      theme: "plain"
    });

    // custom patterns table
    if(this.userSelectionForPdf.sideA && this.userSelectionForPdf.sideB && this.userSelectionForPdf.ulcansType){
      autoTable(doc, {
        startY: (doc as any).lastAutoTable.finalY + 3,
        html: '.patterns-custom-table',
        headStyles:{
          valign: 'middle',
          halign: 'center',
          minCellHeight: 30,
          minCellWidth: 70
        },
        bodyStyles: {
          valign: 'middle',
          halign: 'center',
          minCellHeight: 60,
          minCellWidth: 70,
        },

        didDrawCell: (data: any) => {
          var cellId = data.cell.raw.id;
          if( cellId === 'imgEl'){
            var td = data.cell.raw;
            var img = td.getElementsByTagName('img')[0];
            doc.addImage(img.src, 'JPEG',data.cell.x,  data.cell.y, data.cell.contentWidth + 60, data.cell.contentHeight, '', 'FAST' );
          }
        },
        theme: 'striped'
      });
    }

    // por patterns table
    if(this.userSelectionForPdf.porSelection){
      autoTable(doc, {
        startY: (doc as any).lastAutoTable.finalY + 3,
        html: '.por-patterns-title-table',
        bodyStyles: {
          valign: 'middle',
          cellWidth: 'wrap',
          halign: 'left',
          minCellHeight: 30,
          minCellWidth: 40
        },
        theme: 'striped'
      });

      autoTable(doc, {
        startY: (doc as any).lastAutoTable.finalY + 3,
        html: '.por-patterns-table',
        headStyles:{
          valign: 'middle',
          halign: 'center',
          minCellHeight: 30,
          minCellWidth: 70
        },
        bodyStyles: {
          valign: 'middle',
          halign: 'center',
          minCellHeight: 60,
          minCellWidth: 70,
        },

        didDrawCell: (data: any) => {
          var cellId = data.cell.raw.id;
          if( cellId === 'imgEl'){
            var td = data.cell.raw;
            var img = td.getElementsByTagName('img')[0];
            doc.addImage(img.src, 'JPEG',data.cell.x,  data.cell.y, data.cell.contentWidth + 60, data.cell.contentHeight, '', 'FAST' );
          }
        },
        theme: 'striped'
      });
    }


    autoTable(doc, {
      useCss: true,
      html: '.marketing-table',
      tableWidth: this.appConfigSettings === this.AppConfigSettings.GLOBAL? 413 : 416,
      theme: 'plain',
    });

    let pageSize = doc.internal.pageSize;
    var pageHeight = pageSize.height
      ? pageSize.height
      : pageSize.getHeight();

      autoTable(doc, {
      body: [
        [
          {
            content: 'Ultra Lightweight Camouflage Net System',
            styles: {
              halign: 'center',
              fontStyle: 'bold'

            }
          }
        ],
        [
          {
            content: 'The ability to conceal and protect forces against multi-spectral sensor threats.',
            styles: {
              halign: 'center'
            }
          }
        ]
      ],
      theme: "plain"
    });

      // NSN List for USA prod

    if(this.appConfigSettings == this.AppConfigSettings.USA)
      {
        doc.addPage();

// הוספת כותרת למעלה
autoTable(doc, {
  startY: 40,
  body: [
    [
      {
        content: 'ULCANS NSNs',
        styles: {
          halign: 'center',
          fontSize: 14,
          fontStyle: 'bold'
        }
      }
    ]
  ],
  theme: 'plain'
});

   autoTable(doc, {
        startY: (doc as any).lastAutoTable.finalY + 3,
        html: '.nsn-for-pdf-table',
        headStyles:{
          valign: 'middle',
          halign: 'center',
          minCellHeight: 30,
          minCellWidth: 70
        },
        bodyStyles: {
          valign: 'middle',
          halign: 'center',
          minCellHeight: 55,
          minCellWidth: 70,
        },

        didDrawCell: (data: any) => {
          var cellId = data.cell.raw.id;
          if( cellId === 'imgEl'){
            var td = data.cell.raw;
            var img = td.getElementsByTagName('img')[0];
            doc.addImage(img.src, 'JPEG',data.cell.x,  data.cell.y, data.cell.contentWidth + 55, data.cell.contentHeight, '', 'FAST' );
          }
        },
        theme: 'striped'
      });

      }




    const pdfDataUriString = doc.output('datauristring');
    const pdfBase64 = pdfDataUriString.split(',')[1];
    const fileName = `ulcans-info.pdf`;
    this.loadingPdf = true;

    FileSharer.share({
      filename: fileName,
      contentType: "application/pdf",
      // If you want to save base64:
      base64Data: pdfBase64,
    }).then(() => {
      this.loadingPdf = false;
    }).catch(error => {
      this.loadingPdf = false;
    });

    return;
  }

  blobToBase64(blob: Blob): Observable<string> {
    return new Observable<string>(observer => {
        const reader = new FileReader();
        reader.onerror = observer.error;
        reader.onabort = observer.error;
        reader.onload = () => observer.next(reader.result as string);
        reader.onloadend = observer.complete;
        reader.readAsDataURL(blob);
    })
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


