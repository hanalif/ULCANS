import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Configuration } from '../models/configuration.model';
import { ConfigurationsService } from '../services/configurationsService/configurations.service';

@Component({
  selector: 'app-configuration-list',
  templateUrl: './configuration-list.page.html',
  styleUrls: ['./configuration-list.page.scss'],
})
export class ConfigurationListPage implements OnInit {
  configurationsList!: Configuration[];

  constructor(private configurationsService: ConfigurationsService) { }

  ngOnInit() {
    this.configurationsList = this.configurationsService.getConfigurations();
  }

}
