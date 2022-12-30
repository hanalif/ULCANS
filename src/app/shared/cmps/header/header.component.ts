import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isHamburgerClicked: boolean = false;
  numberOfInnerMenuClicked: number = 0;

  constructor(private route: Router) { }

  ngOnInit() {}

  onLogo(){
    this.route.navigate(['home']);
  }

  onHamburgerIcon(){
    this.isHamburgerClicked = !this.isHamburgerClicked
  }

  onMenuLink(val:number){
      this.numberOfInnerMenuClicked = val;


  }

}
