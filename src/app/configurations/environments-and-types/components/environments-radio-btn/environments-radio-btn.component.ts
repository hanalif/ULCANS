import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ReplaySubject, Subscription, takeUntil } from 'rxjs';
import { AssetForPdf } from 'src/app/shared/models/asset-for-pdf.model';
import { UserSelectionService } from 'src/app/shared/services/user-selection.service';
import { Environment } from '../../models/environment.model';
import { EnvironmentsService } from '../../services/environments.service';

@Component({
  selector: 'app-environments-radio-btn',
  templateUrl: './environments-radio-btn.component.html',
  styleUrls: ['./environments-radio-btn.component.scss'],
})
export class EnvironmentsRadioBtnComponent implements OnInit, OnDestroy {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  environmentIdSelection!: string;
  @Input() currSide!:string;
  environments!:Environment[];
  @Input() currUserSelection!: AssetForPdf;

  constructor(private environmentsService: EnvironmentsService, private userSelectionService:UserSelectionService) { }


  ngOnInit() {
    this.environmentsService.environments$.pipe(takeUntil(this.destroyed$)).subscribe(enviroments=>{
      this.environments = enviroments;
    })
      if(this.currSide){
        if(this.currSide === 'A'){
          if(this.currUserSelection!.sideA){
            if(this.environmentIdSelection === this.currUserSelection!.sideA.environmentId){
              this.environmentIdSelection = this.currUserSelection!.sideA.environmentId;
            }
          }
        }
        if(this.currSide === 'B'){
          if(this.currUserSelection!.sideB){
            if(this.environmentIdSelection === this.currUserSelection!.sideB.environmentId){
              this.environmentIdSelection = this.currUserSelection!.sideB.environmentId;
            }
          }
        }
      }

  }

  onEnvironmentLink(id:string){
    this.environmentIdSelection = id;
    setTimeout(()=>{
      this.environmentsService.setIsClothPatternsMenuOpen(true);
      this.environmentsService.setCurrClothPatterns(id, this.currSide);
    },1000)
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }
}
