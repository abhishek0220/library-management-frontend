import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreInfoService {
  serverURL = "https://library-management.azurewebsites.net";
  //serverURL = "http://localhost:5000";
  accessToken: string = "";
  isSignedIn : boolean;
  userid: string;
  name: string;

  constructor() {
    this.refresh();
  }

  setAccessToken(token: string){
    localStorage.setItem('token',token);
    this.accessToken = token;
    this.refresh();
  }

  getAccessToken(){
    return localStorage.getItem('refreshToken');
  }

  intializeValue(token, userid, name){
    this.setAccessToken(token);
    this.userid = userid;
    this.name = name;
    localStorage.setItem('uid',userid);
    localStorage.setItem('name',name);
  }

  refresh(){
    this.isSignedIn = this.getAccessToken()?true:false;
  }

  signOut(){
    console.log("signout")
    localStorage.removeItem('token');
    localStorage.removeItem('uid');
    localStorage.removeItem('name');
    this.refresh();
  }

}
