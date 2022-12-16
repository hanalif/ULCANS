import { Component, OnInit } from '@angular/core';
import { Asset } from '../models/asset.model';
import { AssetsService } from '../services/assets/assets.service';

@Component({
  selector: 'app-typical-configurations',
  templateUrl: './typical-configurations.page.html',
  styleUrls: ['./typical-configurations.page.scss'],
})
export class TypicalConfigurationsPage implements OnInit {
  assetsList!: Asset[];

  constructor(private assetsService:AssetsService) { }

  ngOnInit() {
    this.assetsService._getAssetes().subscribe(assets=>{
      this.assetsList = assets;
    })
  }

}
