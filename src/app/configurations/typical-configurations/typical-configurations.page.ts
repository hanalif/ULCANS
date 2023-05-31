import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSearchbar, NavController } from '@ionic/angular';
import { debounceTime, Subscription } from 'rxjs';
import { Asset } from '../models/asset.model';
import { AssetsService } from '../services/assets/assets.service';

@Component({
  selector: 'app-typical-configurations',
  templateUrl: './typical-configurations.page.html',
  styleUrls: ['./typical-configurations.page.scss'],
})
export class TypicalConfigurationsPage implements OnInit, AfterViewInit, OnDestroy {
  public assetsList!: Asset[];
  @ViewChild(IonSearchbar) searchBarEl!: IonSearchbar;
  areAssetsFound: boolean = true;
  assetsSuscription!: Subscription;



  constructor(
    private assetsService:AssetsService,
    private cd: ChangeDetectorRef,
    private route: Router,
    private navCntrl: NavController) { }



    ngOnInit() {
      this.assetsSuscription = this.assetsService.getAssets().subscribe(assets =>{
        this.assetsList = assets;
        this.cd.detectChanges();
      });

    }

    ngOnDestroy(): void {
      this.assetsSuscription.unsubscribe();
    }

    onAssetLink(assetId: string){
    this.route.navigate(['configurations', 'typical-configurations', assetId]);
    }

    onRemoveAsset(assetId:string){
      this.assetsService.removeAsset(assetId);

    }

    ngAfterViewInit(): void {
      this.searchBarEl.ionInput.pipe(
        debounceTime(300)
      ).subscribe(res => {
        const target = res.target as HTMLInputElement;
        this.assetsList = this.assetsService.getSearchResultAssets(target.value);
        this.areAssetsFound = this.assetsList.length === 0? false : true;
      })

    }


}
