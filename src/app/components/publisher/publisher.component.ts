import { Component, OnInit } from '@angular/core';
import { StoreInfoService }  from '../../services/store-info.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.css']
})
export class PublisherComponent implements OnInit {

  newPublisherForm : FormGroup;
  editIndex = -1;
  allPublisher = [];
  name: string = '';
  constructor(
    private http: HttpClient,
    private storeInfo: StoreInfoService,
    public fb: FormBuilder,
  ) {
    this.mainForm();
  }

  ngOnInit(): void {
    this.getPublisher();
  }
  mainForm() {
    this.newPublisherForm = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      editname: [''],
      editaddress: [''],
      editphone: [''],
    })
  }
  getPublisher(){
    this.editIndex = -1;
    this.newPublisherForm.reset();
    this.http.get(`${this.storeInfo.serverURL}/publisher`).pipe().subscribe((data)=>{
      this.allPublisher = data['publishers'];
    },error =>{
      console.log(error)
    })
  }
  editTrigger(val : number){
    console.log(val)
    this.newPublisherForm.patchValue({
      editname: this.allPublisher[val]['p_name'],
      editaddress: this.allPublisher[val]['address'],
      editphone: this.allPublisher[val]['phone']
    })
    this.editIndex = val;
  }
  addPub(){
    this.editIndex = -1;
    if(!this.newPublisherForm.valid){
      return false;
    }
    else{
      this.http.post(`${this.storeInfo.serverURL}/publisher`, this.newPublisherForm.value).pipe().subscribe((data)=>{
        this.getPublisher()
      },error =>{
        console.log("error occured",'--------------------------------------------')
        console.log(error)
      })
    }
  }
  savePub(n:number){
    //this.editIndex = -1;
    var name = this.newPublisherForm.get('editname').value;
    var address = this.newPublisherForm.get('editaddress').value;
    var phone = this.newPublisherForm.get('editphone').value;
    var tmp = {
      'p_id' : n,
      'name' : name,
      'address' : address,
      'phone' : phone
    }
    this.http.post(`${this.storeInfo.serverURL}/publisher`, tmp).pipe().subscribe((data)=>{
      this.getPublisher()
    },error =>{
      console.log("error occured",'--------------------------------------------')
      console.log(error)
    })
  }

}
