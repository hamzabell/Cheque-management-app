import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { AuthenticationServiceService } from 'src/app/services/auth/authentication-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export interface DialogData {
 
}
@Component({
  selector: 'app-assignchaque',
  templateUrl: './assignchaque.component.html',
  styleUrls: ['./assignchaque.component.scss']
})
export class AssignchaqueComponent implements OnInit {

  startNumber: number;
  endNumber: number;
  bankName: string;
  url: string= "http://localhost:8080/user/assign-cheque/1";

  constructor(
    private auth: AuthenticationServiceService,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router,
    public dialogRef: MatDialogRef<AssignchaqueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  assign(){
    console.log(this.bankName);
    console.log(this.endNumber);  
    if(this.bankName==undefined){
      this.openSnackBar("Please fill Bank Name Field", "close");
      this.onNoClick();
      return false;
    }
    if (this.endNumber == undefined){
      this.openSnackBar("Please fill End Number Field", "close");
      this.onNoClick();
      return false;
    }
    if (this.startNumber== undefined){
      this.openSnackBar("Please fill Start Number Field", "close");
      this.onNoClick();
      return false;
    }
    const headers = this.auth.getHeaders();
    this.http.post(this.url, {
      bankName: this.bankName,
      startNumber: this.startNumber,
      endNumber: this.endNumber
    }, headers).subscribe( res=>{
      this.openSnackBar("Cheque Assigned sucessfully", "close");
      this.onNoClick();
    }, err => {
      this.openSnackBar(err.name, "close");
    });
  }

}
