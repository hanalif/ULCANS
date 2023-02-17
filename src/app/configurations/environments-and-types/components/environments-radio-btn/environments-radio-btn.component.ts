import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Environment } from '../../models/environment.model';
import { EnvironmentsService } from '../../services/environments.service';

@Component({
  selector: 'app-environments-radio-btn',
  templateUrl: './environments-radio-btn.component.html',
  styleUrls: ['./environments-radio-btn.component.scss'],
})
export class EnvironmentsRadioBtnComponent implements OnInit {
  environmentIdSelection!: string;
  @Input() currSide!:string;
  enviromentSubscription!: Subscription;
  environments!:Environment[];
  constructor(private environmentsService: EnvironmentsService) { }

  ngOnInit() {
    this.enviromentSubscription = this.environmentsService.environments$.subscribe(enviroments=>{
      this.environments = enviroments;
    })


  }

  onEnvironmentLink(id:string){
    this.environmentIdSelection = id;
    setTimeout(()=>{
      this.environmentsService.setIsClothPatternsMenuOpen(true);
      this.environmentsService.setCurrClothPatterns(id, this.currSide);
    },1000)
  }
}
