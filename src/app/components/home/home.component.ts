import { Component, OnInit } from '@angular/core';
import { StoreInfoService }  from '../../services/store-info.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allBooks = [];
  constructor(
    private http: HttpClient,
    private storeInfo: StoreInfoService,
  ) {
    this.getBooks();
  }

  ngOnInit(): void {
  }
  getBooks(){
    this.http.get(`${this.storeInfo.serverURL}/books`).pipe().subscribe((data)=>{
      this.allBooks = data['books'];
    },error =>{
      console.log(error)
    })
  }
}
