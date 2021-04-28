import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreInfoService }  from '../../services/store-info.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  invalid = false;
  errorOcc = false;

  constructor(
    private http: HttpClient,
    private storeInfo: StoreInfoService,
    public fb: FormBuilder,
    private router: Router,
  ) {
    this.mainForm();
    if(this.storeInfo.isSignedIn){
      this.router.navigateByUrl('publisher');
    }
  }

  ngOnInit(): void {
    
  }

  mainForm() {
    this.loginForm = this.fb.group({
      userid: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  login(){
    if(!this.loginForm.valid){
      return false;
    }
    else{
      this.invalid = false;
      this.errorOcc = false;
      this.http.post(`${this.storeInfo.serverURL}/login`, this.loginForm.value).pipe().subscribe((data)=>{
        if(data['status'] == 'OK'){
          var name = data['name'];
          var uid = data['userid'];
          var token = data['access_token'];
          //var refToken = data['refresh_token']
          this.storeInfo.intializeValue(token, uid, name);
          this.router.navigateByUrl('publisher');
        }
        else{
          this.invalid = true;
        }
      },error =>{
        this.errorOcc = true;
        console.log(error)
      })
    }
    
  }

}
