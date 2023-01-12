import { ComponentRef, Injectable } from '@angular/core';
import { asyncScheduler, BehaviorSubject } from 'rxjs';
import { AssetsService } from 'src/app/configurations/services/assets/assets.service';
import { ConfigurationsService } from 'src/app/configurations/services/configurationsService/configurations.service';
import { AssetForDisplay } from '../models/asset-for-display';
import { AssetForPdf } from '../models/asset-for-pdf.model';
import { FtToMPipe } from '../pipes/ft-to-m.pipe';
import { MenuCategoriesService } from './menu-categories.service';
import JSPDF from 'jspdf';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular';
import { PdfPageComponent } from '../components/pdf-page/pdf-page.component';






@Injectable({
  providedIn: 'root'
})
export class UserSelectionService {

  private isUserSelectionsMenuOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private numOfSelections$: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  private assetsForPdf$: BehaviorSubject<AssetForPdf[]> = new BehaviorSubject<AssetForPdf[]>([]);

  constructor(
    private measurmentsPipe: FtToMPipe,
    private assetsService: AssetsService,
    private menuCategoriesService: MenuCategoriesService,
    private configurationsService: ConfigurationsService,
    private file: File,
    private fileOpener: FileOpener,
    public plt: Platform,
    ) { }

  getIsUserSelectionsMenuOpen() {
     return this.isUserSelectionsMenuOpen$;
  }

  getnumOfSelections(){
    return this.numOfSelections$.asObservable();
  }

  getAssetsForPdf(){
    return this.assetsForPdf$.asObservable();
  }

  setIsUserSelectionsMenuOpen(val:boolean){
    this.isUserSelectionsMenuOpen$.next(val);
  }

  addAssetForPdf(assetForPdf:AssetForPdf){
    const assetsForPdf = this.assetsForPdf$.getValue();
    const foundAssetIndex = assetsForPdf.findIndex(a=> a.assetId === assetForPdf.assetId);
    if(foundAssetIndex !== -1){
      assetsForPdf.splice(foundAssetIndex, 1, assetForPdf);
    }else{
      assetsForPdf.push(assetForPdf);
      this.setNumberOfNewSelections(1);
    }
    this.assetsForPdf$.next(assetsForPdf);
  }

  getAssetsForDisplay(assetsForPdf: AssetForPdf[]){
        const assetIds = assetsForPdf.map(asset => asset.assetId);
        const classesIds = assetsForPdf.map(asset => asset.enviormentId);
        const configurationsIds = assetsForPdf.map(asset => asset.configuraionId);

        const assets = this.assetsService.getAssetsByIds(assetIds);
        const classes = this.menuCategoriesService.getConfigurationsClassesCategories();
        const configurations = this.configurationsService.getConfigurationsByIds(configurationsIds);

        let assetsForDisplay: AssetForDisplay[] = [];

        for(let i = 0; i< assetsForPdf.length; i++){
          let assetForDisplay = {
          asset: assets.find(a=> a.id === assetsForPdf[i].assetId),
          configuratoin: configurations.find(c => c.id === assetsForPdf[i].configuraionId),
          enviorment: classes.find( e => e.id === assetsForPdf[i].enviormentId),
          measureType: assetsForPdf[i].measureType
        }

        assetsForDisplay.push(assetForDisplay);
      }

      return assetsForDisplay;
  }

  setNumberOfNewSelections(num: number){

    let currNum = this.numOfSelections$.getValue();
    if( num == 0){
      this.numOfSelections$.next(0);
    }else{
      this.numOfSelections$.next(currNum + num);
    }
  }


  downloadPdf(htmlToPdfContent: ComponentRef<PdfPageComponent>, currPlatform: string | string[]) {
    console.log(currPlatform)
    this.setNumberOfNewSelections(0);
    this.assetsForPdf$.next([]);



       asyncScheduler.schedule(() => {
         const htmlString = htmlToPdfContent.location.nativeElement.innerHTML;
         htmlToPdfContent.destroy();

         var doc = new JSPDF();
         doc.html(htmlString, {
         callback: ((doc: JSPDF) => {
           if(currPlatform[0] === 'desktop'){
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




