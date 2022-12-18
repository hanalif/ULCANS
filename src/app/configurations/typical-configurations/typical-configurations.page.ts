import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  private searchBarElSub!: Subscription;


  constructor(private assetsService:AssetsService, private route: Router, private navCntrl: NavController) { }



  ngOnInit() {
    this.assetsService._getAssetes().subscribe(assets=>{
      this.assetsList = assets;
    })
  }

  onAssetLink(assetId: string){
    this.route.navigate(['configurations', 'typical-configurations', assetId]);

  }

  ngAfterViewInit(): void {
    this.searchBarEl.ionInput.pipe(
      debounceTime(300)
    ).subscribe(res => {
      const target = res.target as HTMLInputElement;
      this.assetsService.getSearchResultAssets(target.value).subscribe(fetchedAssets=>{
        this.assetsList = fetchedAssets;
      })
    })
  }

  ngOnDestroy(): void {
    this.searchBarElSub?.unsubscribe()
  }
}
