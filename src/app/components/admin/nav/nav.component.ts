import { Component, OnInit } from '@angular/core';
import { StoreInfoService }  from '../../../services/store-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  name = "";
  constructor(
    private storeInfo: StoreInfoService,
    private router: Router,
  ) {
    this.name = this.storeInfo.name;
  }

  ngOnInit(): void {
  }
  signout(){
    this.storeInfo.signOut();
    this.router.navigateByUrl('login');
  }

}
