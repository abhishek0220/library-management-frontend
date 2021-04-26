import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreInfoService {
  serverURL = "https://library-management.azurewebsites.net";
  //serverURL = "http://localhost:5000";
  constructor() { }
}
