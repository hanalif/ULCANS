import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ReplaySubject, Subscription, takeUntil } from 'rxjs';
import { AssetForPdf } from 'src/app/shared/models/asset-for-pdf.model';
import { Environment } from '../../models/environment.model';
import { EnvironmentsService } from '../../services/environments.service';

@Component({
  selector: 'app-environments-radio-btn',
  templateUrl: './environments-radio-btn.component.html',
  styleUrls: ['./environments-radio-btn.component.scss'],
})
export class EnvironmentsRadioBtnComponent implements OnInit, OnDestroy, OnChanges {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  environmentIdSelection!: string;
  @Input() currSide!:string;
  @Input() currUserSelection!: AssetForPdf
  environments!:Environment[];

  constructor(private environmentsService: EnvironmentsService) { }


  ngOnInit() {
    this.environmentsService.environments$.pipe(takeUntil(this.destroyed$)).subscribe(enviroments=>{
      this.environments = enviroments;
    })

  }

  ngOnChanges(changes: SimpleChanges): void {
    let currUserSelection: AssetForPdf = changes['currUserSelection'].currentValue;

    if(currUserSelection.sideA !== undefined){
      if(this.currSide === 'A'){
        this.environmentIdSelection = currUserSelection.sideA.environmentId;
      }
    }
    if(currUserSelection.sideB !== undefined){
      if(this.currSide === 'B'){
        this.environmentIdSelection = currUserSelection.sideB.environmentId;
      }
    }

  }

  onEnvironmentLink(id:string){
    this.environmentIdSelection = id;

    setTimeout(()=>{
      this.environmentsService.setIsClothPatternsMenuOpen(true);
      this.environmentsService.setCurrClothPatterns(id, this.currSide);
    }, 1000)

  }


  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }
}
