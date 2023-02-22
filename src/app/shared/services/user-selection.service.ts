import { ComponentRef, Injectable } from '@angular/core';
import { asyncScheduler, BehaviorSubject } from 'rxjs';
import { AssetsService } from 'src/app/configurations/services/assets/assets.service';
import { ConfigurationsService } from 'src/app/configurations/services/configurationsService/configurations.service';
import { AssetForDisplay } from '../models/asset-for-display';
import { AssetForPdf } from '../models/asset-for-pdf.model';
import JSPDF from 'jspdf';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular';
import { PdfPageComponent } from '../components/pdf-page/pdf-page.component';
import { EnvironmentsService } from 'src/app/configurations/environments-and-types/services/environments.service';
import { SystemSide } from '../models/system-side.model';
import { SystemSideForDisplay } from '../models/system-side-for-display.mode';
import { UtilService } from './util.service';


@Injectable({
  providedIn: 'root'
})
export class UserSelectionService {

  private isUserSelectionsMenuOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private numOfSelections$: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  private assetsForPdf$: BehaviorSubject<AssetForPdf[]> = new BehaviorSubject<AssetForPdf[]>([]);
  private isProcessingPdf$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isDisabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private progressBar$: BehaviorSubject<number> = new BehaviorSubject<number>(0);


  public userCurrSelection$: BehaviorSubject<AssetForPdf | null> = new BehaviorSubject<AssetForPdf | null>(null);


  constructor(
    private assetsService: AssetsService,
    private configurationsService: ConfigurationsService,
    private file: File,
    private fileOpener: FileOpener,
    public plt: Platform,
    public environmentsService: EnvironmentsService,
    public utilService: UtilService
    ) { }

  getIsUserSelectionsMenuOpen() {
     return this.isUserSelectionsMenuOpen$;
  }

  getisDisabled(){
    return this.isDisabled$.asObservable();
  }

  getnumOfSelections(){
    return this.numOfSelections$.asObservable();
  }

  getAssetsForPdf(){
    return this.assetsForPdf$.asObservable();
  }

  getIsProcessingPdf(){
    return this.isProcessingPdf$.asObservable();
  }

  getprogressBar(){
    return this.progressBar$.asObservable();
  }

  setIsUserSelectionsMenuOpen(val:boolean){
    this.isUserSelectionsMenuOpen$.next(val);
  }

  updateCurrUserSelections(userSelections: Partial<AssetForPdf>){
    let currSelctionValue = this.userCurrSelection$.getValue();
    currSelctionValue = {...currSelctionValue, ...userSelections} as AssetForPdf;
    let numsOfKeys = Object.values(currSelctionValue).length;
    let progressNum = numsOfKeys * 16.666;
    this.progressBar$.next(progressNum);
    if(numsOfKeys === 6){
      this.isDisabled$.next(false);
    }
    this.userCurrSelection$.next(currSelctionValue);
  }

  resetCurrUserSelection(){
    this.userCurrSelection$.next(null);
    this.progressBar$.next(0);
  }

  addAssetForPdf(){
    const assetForPdf = this.userCurrSelection$.getValue() as AssetForPdf;
    if(!assetForPdf.id){
      assetForPdf.id = this.utilService._makeId();
      this.progressBar$.next(0);
    }
    const assetsForPdf = this.assetsForPdf$.getValue();
    const foundAssetIndex = assetsForPdf.findIndex(a=> a.id === assetForPdf.assetId);
    if(foundAssetIndex !== -1){
      assetsForPdf.splice(foundAssetIndex, 1, assetForPdf);
    }else{
      assetsForPdf.push(assetForPdf);
      this.setNumberOfNewSelections(1);
      this.userCurrSelection$.next(null);
      this.isDisabled$.next(true);
    }
    this.assetsForPdf$.next(assetsForPdf);
  }

  getAssetsForDisplay(assetsForPdf: AssetForPdf[]){

        const assetIds = (assetsForPdf.map(asset => asset.assetId)) as string[];
        const configurationsIds = (assetsForPdf.map(asset => asset.configuraionId)) as string[];
        const sidesA = (assetsForPdf.map(asset => asset.sideA));
        const sidesB = (assetsForPdf.map(asset => asset.sideB));

        const assets = this.assetsService.getAssetsByIds(assetIds);
        const sidesAForDisplay = this.getSidesForDisplay(sidesA);
        const sidesBForDisplay = this.getSidesForDisplay(sidesB);
        const configurations = this.configurationsService.getConfigurationsByIds(configurationsIds);

        let assetsForDisplay: AssetForDisplay[] = [];

        for(let i = 0; i< assetsForPdf.length; i++){
          let assetForDisplay = {
          id: assetsForPdf[i].id,
          asset: assets.find(a=> a.id === assetsForPdf[i].assetId),
          configuratoin: configurations.find(c => c.id === assetsForPdf[i].configuraionId),
          sideA: sidesAForDisplay[i],
          sideB: sidesBForDisplay[i],
          measureType: assetsForPdf[i].measureType
        }

        assetsForDisplay.push(assetForDisplay);
      }
      return assetsForDisplay;
  }

  getSidesForDisplay(sidesArr: SystemSide[]){
      return sidesArr.map(side => {
      const sideForDispaly: SystemSideForDisplay = this.environmentsService.getSystemSideForDisplay(side.environmentId, side.clothPatternIndex);
      return sideForDispaly;
    })
  }


  setNumberOfNewSelections(num: number){
    let currNum = this.numOfSelections$.getValue();
    if( num == 0){
      this.numOfSelections$.next(0);
    }else{
      this.numOfSelections$.next(currNum + num);
    }
  }


  downloadPdf(htmlToPdfContent: ComponentRef<PdfPageComponent>, currPlatforms: string[]) {
       asyncScheduler.schedule(() => {
        this.isProcessingPdf$.next(true);
         const htmlString = htmlToPdfContent.location.nativeElement.innerHTML;
         htmlToPdfContent.destroy();

         let isCurrPlatformDesktopOrMobileweb: boolean = this.checkPlatform(currPlatforms);

         var doc = new JSPDF();
         doc.html(htmlString, {
         callback: ((doc: JSPDF) => {
           if(isCurrPlatformDesktopOrMobileweb){
             doc.save("output.pdf");
             this.isProcessingPdf$.next(false);
           }else{
             let blobPdf = new Blob([doc.output('blob')], {type: 'application/pdf'});
             this.file.writeFile(this.file.dataDirectory, 'output.pdf', blobPdf, { replace: true }).then(fileEntry => {
              this.isProcessingPdf$.next(false);
             this.fileOpener.open(this.file.dataDirectory + 'output.pdf', 'application/pdf');
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

     this.setNumberOfNewSelections(0);
      this.assetsForPdf$.next([]);
   }


   checkPlatform(currPlatforms: string[]){
    let isCurrPlatformDesktopOrMobileweb: boolean = false;
    for(let i = 0; i< currPlatforms.length; i++){
        if(currPlatforms[i] === "desktop"){
          isCurrPlatformDesktopOrMobileweb = true;
        } else if(currPlatforms[i] === "mobileweb"){
          isCurrPlatformDesktopOrMobileweb = true;
        }
        else{
          isCurrPlatformDesktopOrMobileweb = false;
        }
      }
      return isCurrPlatformDesktopOrMobileweb;

   }

}







