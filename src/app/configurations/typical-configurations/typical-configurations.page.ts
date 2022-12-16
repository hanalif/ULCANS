import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonSearchbar } from '@ionic/angular';
import { SegmentChangeEventDetail } from '@ionic/core/dist/types/interface';
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


  constructor(private assetsService:AssetsService) { }



  ngOnInit() {
    this.assetsService._getAssetes().subscribe(assets=>{
      this.assetsList = assets;
    })
  }

  ngAfterViewInit(): void {
    this.searchBarEl.ionInput.pipe(
      debounceTime(300)
    ).subscribe(res => {
      const target = res.target as HTMLInputElement;
      console.log(target.value)
    })
  }

  ngOnDestroy(): void {
    this.searchBarElSub.unsubscribe()
  }
}
