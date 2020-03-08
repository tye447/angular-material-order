import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import {MatSort} from '@angular/material/sort';
import {CookieService} from 'ngx-cookie-service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {FormComponent} from '../form/form.component';
import {CommonService} from '../../services/common/common.service';

export interface ClientModel {
  id: any;
  name: any;
  description: any;
}
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = ['id', 'name', 'description', 'operation'];
  dataSource: MatTableDataSource<ClientModel>;
  action: string;
  client: ClientModel;
  target = 'client';
  constructor(private router: Router, private cookieService: CookieService,
              private dialog: MatDialog, private commonService: CommonService) {}
  ngOnInit() {
    this.action = 'add';
    this.client = {id: '', name: '', description: ''};
    this.checkCookie();
  }
  checkCookie() {
    const cookie = this.cookieService.get('user');
    if (cookie !== null && cookie !== undefined && cookie.length > 0) {
      this.getData();
    } else {
      this.router.navigateByUrl('login').then();
    }
  }
  add() {
    this.action = 'add';
    this.openDialog('', this.action, this.target);
  }
  update(item) {
    this.action = 'update';
    this.openDialog(item, this.action, this.target);
  }
  delete(item) {
    this.commonService.delete('client', item).subscribe(() => {
      this.getData();
      this.action = 'add';
    });
  }
  getData() {
    this.commonService.get('client').subscribe(result => {
      const data: ClientModel[] = result.data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialog(item, action: string, target: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      action, item, target
    };
    const dialogRef = this.dialog.open(FormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.getData();
    });
  }


}
