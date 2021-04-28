import { Component, OnInit } from '@angular/core';
import { StoreInfoService }  from '../../services/store-info.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  newRentalForm : FormGroup;
  editIndex = -1;
  allRental = [];

  constructor(
    private http: HttpClient,
    private storeInfo: StoreInfoService,
    public fb: FormBuilder,
  ) {
    this.mainForm();
  }

  ngOnInit(): void {
    this.getRental();
  }
  mainForm() {
    this.newRentalForm = this.fb.group({
      fine: ['', [Validators.required]],
      limit: ['', [Validators.required]],
      price: ['', [Validators.required]],
      editfine: [''],
      editlimit: [''],
      editprice: [''],
    })
  }
  getRental(){
    this.editIndex = -1;
    this.newRentalForm.reset();
    this.http.get(`${this.storeInfo.serverURL}/rental`).pipe().subscribe((data)=>{
      this.allRental = data['Rental'];
    },error =>{
      console.log(error)
    })
  }
  editTrigger(val : number){
    console.log(val)
    this.newRentalForm.patchValue({
      editfine: this.allRental[val]['fine_day'],
      editlimit: this.allRental[val]['limit_day'],
      editprice: this.allRental[val]['price_day']
    })
    this.editIndex = val;
  }
  addRental(){
    this.editIndex = -1;
    if(!this.newRentalForm.valid){
      return false;
    }
    else{
      this.http.post(`${this.storeInfo.serverURL}/rental`, this.newRentalForm.value).pipe().subscribe((data)=>{
        this.getRental()
      },error =>{
        console.log("error occured",'--------------------------------------------')
        console.log(error)
      })
    }
  }
  saveRental(n:number){
    //this.editIndex = -1;
    var fine = this.newRentalForm.get('editfine').value;
    var limit = this.newRentalForm.get('editlimit').value;
    var price = this.newRentalForm.get('editprice').value;
    var tmp = {
      'rentalId' : n,
      'price' : price,
      'fine' : fine,
      'limit' : limit
    }
    this.http.post(`${this.storeInfo.serverURL}/rental`, tmp).pipe().subscribe((data)=>{
      this.getRental()
    },error =>{
      console.log("error occured",'--------------------------------------------')
      console.log(error)
    })
  }
  deleteRental(n:number){
    this.http.delete(`${this.storeInfo.serverURL}/rental?id=${n}`).pipe().subscribe((data)=>{
      this.getRental()
    },error =>{
      console.log("error occured",'--------------------------------------------')
      console.log(error)
    })
  }



}
