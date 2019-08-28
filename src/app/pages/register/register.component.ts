import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationServiceService } from 'src/app/services/auth/authentication-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  url: string = "http://localhost:8080/user/register"
  username: string;
  password: string;
  branch: string;
  role: string;
  response: Object;

  constructor(private http: HttpClient,   
    private auth: AuthenticationServiceService,
    private snackBar: MatSnackBar,
    private router: Router
    ) { }

  ngOnInit() {
  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }


  register(){
    const response= this.http.post(this.url, {
      "username": this.username,
      "password": this.password,
      "branch": this.branch,
      "role": this.role
    })
    response.subscribe(res => {
      if (res['status'] === 201){
          this.auth.storeUserInfo(this.username, this.password);
          this.openSnackBar("Registration Successful", "ok");
          this.router.navigate(['dashboard']);
      }
    },err=> {
      this.openSnackBar(err, "ok");
    }
    )
  }
}
