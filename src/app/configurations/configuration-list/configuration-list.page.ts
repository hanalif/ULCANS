import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Configuration } from '../models/configuration.model';
import { ConfigurationsService } from '../services/configurationsService/configurations.service';

@Component({
  selector: 'app-configuration-list',
  templateUrl: './configuration-list.page.html',
  styleUrls: ['./configuration-list.page.scss'],
})
export class ConfigurationListPage implements OnInit, OnDestroy {
  configurationsList!: Configuration[];
  configurationsSubscription!: Subscription;

  constructor(private configurationsService: ConfigurationsService) { }


  ngOnInit() {
    this.configurationsSubscription = this.configurationsService.getConfigurations().subscribe(configurations=>{
      this.configurationsList = configurations;
    });
  }

  ngOnDestroy(): void {
    this.configurationsSubscription.unsubscribe();
  }

}
