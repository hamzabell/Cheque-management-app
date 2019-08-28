import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationServiceService } from 'src/app/services/auth/authentication-service.service';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
export interface Food {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  data: any;
  url: string = "http://localhost:8080/user";
  dataSource: any;
 displayedColumns: string[] = ['id', 'username', 'role', 'branch'];

  constructor(
    private http: HttpClient,
    private auth: AuthenticationServiceService,
    private route: Router
  ) { }

  ngOnInit() {
    this.http.get(this.url, this.auth.getHeaders()).subscribe(res => {
      this.data = res;
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
