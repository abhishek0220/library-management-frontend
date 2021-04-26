import { Component, OnInit } from '@angular/core';
import { StoreInfoService }  from '../../services/store-info.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.css']
})
export class PublisherComponent implements OnInit {

  allPublisher = [];
  constructor(
    private http: HttpClient,
    private storeInfo: StoreInfoService,
  ) { }

  ngOnInit(): void {
    this.getPublisher();
  }
  getPublisher(){
    this.http.get(`${this.storeInfo.serverURL}/publisher`).pipe().subscribe((data)=>{
      this.allPublisher = data['publishers'];
    },error =>{
      console.log(error)
    })
  }

}
