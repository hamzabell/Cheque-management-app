import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from 'src/app/services/auth/authentication-service.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  username: string;
  password: string;
  url: string = "http://localhost:8080/user";
  responseCode: string;

  constructor(
    private auth: AuthenticationServiceService,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
    ) { 
  
  }

  ngOnInit() {
  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  login() {
    this.auth.storeUserInfo(this.username, this.password);
    const headers = this.auth.getHeaders();
    const response =  this.http.get(this.url, headers);
    response.subscribe(res => {
      this.openSnackBar("Login Successful", "ok");
      this.router.navigate(['dashboard']);
    }, err=> {
      this.auth.clear();
      this.openSnackBar(err.name, "close");
    });
  }
}