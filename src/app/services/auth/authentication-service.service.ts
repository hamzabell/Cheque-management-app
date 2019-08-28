import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  constructor() { 
  }

  storeUserInfo(username, password) {
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("password", password);
  }

  getHeaders(){
    const username = sessionStorage.getItem("username");
    const password = sessionStorage.getItem("password");
    const authorizationData = 'Basic '+btoa(username + ':' + password);
    const headerOptions =  {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': authorizationData
      })
    }
    return headerOptions;
  }

  clear(){
    sessionStorage.clear();
  }

  
}
