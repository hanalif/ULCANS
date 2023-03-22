import { Injectable } from '@angular/core';
import { asyncScheduler, BehaviorSubject } from 'rxjs';
import { AssetsService } from 'src/app/configurations/services/assets/assets.service';
import { ConfigurationsService } from 'src/app/configurations/services/configurationsService/configurations.service';
import { AssetForDisplay } from '../models/asset-for-display';
import { AssetForPdf } from '../models/asset-for-pdf.model';
import { Platform } from '@ionic/angular';
import { EnvironmentsService } from 'src/app/configurations/environments-and-types/services/environments.service';
import { SystemSide } from '../models/system-side.model';
import { SystemSideForDisplay } from '../models/system-side-for-display.mode';
import { UtilService } from './util.service';
import { SystemTypesService } from 'src/app/configurations/environments-and-types/services/system-types.service';


@Injectable({
  providedIn: 'root'
})
export class UserSelectionService {

  private isUserSelectionsMenuOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private numOfSelections$: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  public assetsForPdf$: BehaviorSubject<AssetForPdf[]> = new BehaviorSubject<AssetForPdf[]>([]);
  private isProcessingPdf$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isDisabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private progressBar$: BehaviorSubject<number> = new BehaviorSubject<number>(0);


  public userCurrSelection$: BehaviorSubject<AssetForPdf | null> = new BehaviorSubject<AssetForPdf | null>(null);


  constructor(
    private assetsService: AssetsService,
    private configurationsService: ConfigurationsService,
    public plt: Platform,
    public environmentsService: EnvironmentsService,
    public utilService: UtilService,
    public systemTypesService: SystemTypesService
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
  getCurrUserSelectionValue(){
    return this.userCurrSelection$.getValue();
  }

  updateCurrUserSelections(userSelections: Partial<AssetForPdf>){
    let currSelctionValue = this.getCurrUserSelectionValue();
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
    const assetForPdf = this.getCurrUserSelectionValue() as AssetForPdf;
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
    this.resetCurrUserSelection();
  }

  removeUserSelection(userSelectionId: string){
    let userSelections = this.assetsForPdf$.getValue();
    const index = userSelections.findIndex(selection=> selection.id === userSelectionId);
    userSelections.splice(index, 1);
    this.assetsForPdf$.next(userSelections);
    this.setNumberOfNewSelections(-1);
  }

  getAssetsForDisplay(assetsForPdf: AssetForPdf[]){

        const assetIds = (assetsForPdf.map(asset => asset.assetId)) as string[];
        const configurationsIds = (assetsForPdf.map(asset => asset.configuraionId)) as string[];
        const sidesA = (assetsForPdf.map(asset => asset.sideA));
        const sidesB = (assetsForPdf.map(asset => asset.sideB));
        const ulcansTypesIds = (assetsForPdf.map(asset=> asset.systemTypeId));

        const assets = this.assetsService.getAssetsByIds(assetIds);
        const sidesAForDisplay = this.getSidesForDisplay(sidesA);
        const sidesBForDisplay = this.getSidesForDisplay(sidesB);
        const configurations = this.configurationsService.getConfigurationsByIds(configurationsIds);
        const ulcansTypes = this.systemTypesService.getUlcansTypesByIds(ulcansTypesIds)

        let assetsForDisplay: AssetForDisplay[] = [];

        for(let i = 0; i< assetsForPdf.length; i++){
          let assetForDisplay = {
          id: assetsForPdf[i].id,
          asset: assets.find(a=> a.id === assetsForPdf[i].assetId),
          configuratoin: configurations.find(c => c.id === assetsForPdf[i].configuraionId),
          sideA: sidesAForDisplay[i],
          sideB: sidesBForDisplay[i],
          measureType: assetsForPdf[i].measureType,
          ulcansType: ulcansTypes[i]
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

  // downloadPdf(htmlToPdfContent: ComponentRef<PdfPageComponent>, currPlatform: string | string[]) {
  //   console.log(currPlatform)
  //   this.setNumberOfNewSelections(0);
  //   this.assetsForPdf$.next([]);



  //      asyncScheduler.schedule(() => {
  //        const htmlString = htmlToPdfContent.location.nativeElement.innerHTML;
  //        htmlToPdfContent.destroy();

  //        var doc = new JSPDF();
  //        doc.html(htmlString, {
  //        callback: ((doc: JSPDF) => {
  //          if(currPlatform[0] === 'desktop'){
  //            doc.save("output.pdf");
  //          }else{
  //            let blobPdf = new Blob([doc.output('blob')], {type: 'application/pdf'});
  //            this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blobPdf, { replace: true }).then(fileEntry => {
  //            this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
  //            })
  //          }
  //        }).bind(this),
  //        margin: [10,10,10,10],
  //        autoPaging: 'text',
  //        x: 0,
  //        y: 0,
  //        width: 190,
  //        windowWidth: 675
  //      });
  //    });
  //  }

}







