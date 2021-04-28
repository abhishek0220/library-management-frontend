import { Component, OnInit } from '@angular/core';
import { StoreInfoService }  from '../../services/store-info.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.css']
})
export class AddBooksComponent implements OnInit {

  allPublisher = [];
  allRental = [];
  bookId = -1;
  newBookForm : FormGroup;
  editMode = false;
  constructor(
    private http: HttpClient,
    private storeInfo: StoreInfoService,
    public fb: FormBuilder,
    private router: Router,
    private activatedroute: ActivatedRoute,
  ) {
    if(!this.storeInfo.isSignedIn){
      this.router.navigateByUrl('login');
    }
    this.mainForm();
    this.getPublisher();
    this.getRental();
    this.activatedroute.queryParamMap.subscribe(params => {
      var tmp = params.get('edit') || 'null';
      var id = parseInt(params.get('id')) || -1;
      if(tmp == 'true' && id != -1){
        this.editMode = true;
        console.log("To be edited")
        this.bookId = id ;
        this.getBook(id);
      }
    });
  }
  
  ngOnInit(): void {
  }

  mainForm() {
    this.newBookForm = this.fb.group({
      name: ['', [Validators.required]],
      isbn: ['', [Validators.required]],
      p_id: ['', [Validators.required]],
      rental_id: ['', [Validators.required]],
      total_copies: ['', [Validators.required]],
      pages: ['', [Validators.required]],
      authors: ['', [Validators.required]],
      thumbnail_url: ['', [Validators.required]],
      categories: ['', [Validators.required]],
      short_desc: ['', [Validators.required]],
      long_desc: ['', [Validators.required]]
    })
  }
  setForm(data){
    this.newBookForm.patchValue(data);
  }

  getBook(val){
    this.http.get(`${this.storeInfo.serverURL}/books?id=${val}`).pipe().subscribe((data)=>{
      console.log(data)
      this.setForm(data);
      return data;
    },error =>{
      return undefined;
    })
  }

  getPublisher(){
    this.http.get(`${this.storeInfo.serverURL}/publisher`).pipe().subscribe((data)=>{
      this.allPublisher = data['publishers'];
    },error =>{
      console.log(error)
    })
  }
  getRental(){
    this.http.get(`${this.storeInfo.serverURL}/rental`).pipe().subscribe((data)=>{
      this.allRental = data['Rental'];
    },error =>{
      console.log(error)
    })
  }

  addbook(){
    if(!this.newBookForm.valid){
      return false;
    }
    else{
      var vals = this.newBookForm.value;
      if(this.editMode){
        vals['book_id'] = this.bookId
      }
      this.http.post(`${this.storeInfo.serverURL}/books`, vals).pipe().subscribe((data)=>{
        this.router.navigateByUrl('book');
      },error =>{
        console.log("error occured",'--------------------------------------------')
        console.log(error)
      })
    }
  }
}
