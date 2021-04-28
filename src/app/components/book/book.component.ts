import { Component, OnInit } from '@angular/core';
import { StoreInfoService }  from '../../services/store-info.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  allBooks = [];

  constructor(
    private http: HttpClient,
    private storeInfo: StoreInfoService,
  ) { }

  ngOnInit(): void {
    this.getBooks();
  }
  getBooks(){
    this.http.get(`${this.storeInfo.serverURL}/books`).pipe().subscribe((data)=>{
      this.allBooks = data['books'];
    },error =>{
      console.log(error)
    })
  }


}
