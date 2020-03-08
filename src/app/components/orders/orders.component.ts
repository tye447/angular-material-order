import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CommonService} from '../../services/common/common.service';
import {FormComponent} from '../form/form.component';
export interface OrderElement {
  id: any;
  client_id: any;
  product_id: any;
  employee_id: any;
  quantity: any;
}
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = ['id', 'client', 'product', 'employee', 'quantity', 'state', 'price_total' , 'operation'];
  dataSource: MatTableDataSource<OrderElement>;
  action: string;
  order: OrderElement;
  target = 'order';
  constructor(private router: Router, private cookieService: CookieService,
              private dialog: MatDialog, private commonService: CommonService) { }

  ngOnInit() {
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
    this.commonService.delete(this.target, item).subscribe(() => {
      this.getData();
    });
  }
  confirm(item) {
    this.commonService.confirm(item).subscribe(result => {
      this.getData();
    });
  }
  getData() {
    this.commonService.get(this.target).subscribe(result => {
      const data: OrderElement[] = result.data;
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
