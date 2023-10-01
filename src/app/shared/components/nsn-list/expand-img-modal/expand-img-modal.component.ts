import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvironmentsService } from 'src/app/configurations/environments-and-types/services/environments.service';

@Component({
  selector: 'app-expand-img-modal',
  templateUrl: './expand-img-modal.component.html',
  styleUrls: ['./expand-img-modal.component.scss'],
})
export class ExpandImgModalComponent implements OnInit {
  imgLink$!: Observable<string>;

  constructor(private environmentsService: EnvironmentsService) { }

  ngOnInit() {
    this.imgLink$ = this.environmentsService.getcurrImgToExpandLink();
  }

  onClose(){
    this.environmentsService.setisExpandImgModalOpen(false);
  }

}
