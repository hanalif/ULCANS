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
export class EnvironmentsRadioBtnComponent implements OnInit, OnDestroy {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  environmentIdSelection!: string;
  @Input() currSide!:string;
  environments!:Environment[];

  constructor(private environmentsService: EnvironmentsService) { }

  ngOnInit() {
    this.environmentsService.environments$.pipe(takeUntil(this.destroyed$)).subscribe(enviroments=>{
      this.environments = enviroments;
    })

    this.environmentsService.currEnvironmentIdAndSide$.asObservable().pipe(takeUntil(this.destroyed$)).subscribe(currEnvironmentIdAndSide=>{
      if(currEnvironmentIdAndSide!.currSide === this.currSide){
        this.environmentIdSelection = currEnvironmentIdAndSide!.currEnvironmentId;
      }
    })
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
