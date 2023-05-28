import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription, debounceTime } from 'rxjs';
import { Configuration } from '../models/configuration.model';
import { ConfigurationsService } from '../services/configurationsService/configurations.service';
import { IonSearchbar } from '@ionic/angular';
import { MeasureType } from 'src/app/shared/models/measure-type.enum';

@Component({
  selector: 'app-configuration-list',
  templateUrl: './configuration-list.page.html',
  styleUrls: ['./configuration-list.page.scss'],
})
export class ConfigurationListPage implements OnInit, OnDestroy, AfterViewInit {
  configurationsList!: Configuration[];
  configurationsSubscription!: Subscription;
  @ViewChild(IonSearchbar) searchBarEl!: IonSearchbar;
  areConfigurationsFound: boolean = true;
  public measureType: MeasureType = MeasureType.METERS;
  public MeasureType = MeasureType;

  tableTitlesList: string[] = ['Configuration Name', 'Image', 'Hexagon', 'Rhombus', 'Length', 'Width', 'Area' ]

  constructor(private configurationsService: ConfigurationsService) { }


  ngOnInit() {
    this.configurationsSubscription = this.configurationsService.getConfigurations().subscribe(configurations=>{
      this.configurationsList = configurations;
    });
  }

  ngAfterViewInit(): void {
    this.searchBarEl.ionInput.pipe(
      debounceTime(300)
    ).subscribe(res => {
      const target = res.target as HTMLInputElement;
      this.configurationsList = this.configurationsService.getConfigurationsSearchResult(target.value);
      this.areConfigurationsFound = this.configurationsList.length === 0? false : true;
    })

  }

  onSelectBtn(measureType:MeasureType){
    if(this.measureType === measureType){
      return;
    }
    this.measureType = measureType;
  }

  ngOnDestroy(): void {
    this.configurationsSubscription.unsubscribe();
  }

}
