import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationServiceService } from 'src/app/services/auth/authentication-service.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-cheques',
  templateUrl: './cheques.component.html',
  styleUrls: ['./cheques.component.scss']
})
export class ChequesComponent implements OnInit {

  data: any;
  url: string = "http://localhost:8080/list-cheques";
  dataSource: any;
  displayedColumns: string[] = ['id', 'bankName', 'startNumber', 'endNumber'];
  constructor(
    private http: HttpClient,
    private auth: AuthenticationServiceService,
    private route: Router
  ) { }

  ngOnInit() {
    this.http.get(this.url, this.auth.getHeaders()).subscribe(res => {
      this.data = res;
      console.log(res);
      this.dataSource = new MatTableDataSource(this.data);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  logout(){
    this.auth.clear();
    this.route.navigate(['/']);

  }

}
