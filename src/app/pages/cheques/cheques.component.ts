import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationServiceService } from 'src/app/services/auth/authentication-service.service';
import { Router } from '@angular/router';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { AssignchaqueComponent } from 'src/app/dialogs/assignchaque/assignchaque.component';

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
    private route: Router,
    private detectChange: ChangeDetectorRef,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.http.get(this.url, this.auth.getHeaders()).subscribe(res => {
      this.data = res;
      this.dataSource = new MatTableDataSource(this.data);
    });
    this.refresh();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  logout(){
    this.auth.clear();
    this.route.navigate(['/']);

  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AssignchaqueComponent, {
      height: '400px',
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refresh();
    });
  }

  refresh() {
    this.http.get(this.url, this.auth.getHeaders()).subscribe(res => {
      this.data = res;
      this.dataSource  = new MatTableDataSource(this.data);
    });
    this.detectChange.detectChanges();
  }

}
