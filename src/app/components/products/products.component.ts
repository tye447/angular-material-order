import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {FormComponent} from '../form/form.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {CommonService} from '../../services/common/common.service';

export interface ProductElement {
  id: any;
  name: any;
  stock: any;
  price: any;
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = ['id', 'name', 'stock', 'price', 'operation'];
  dataSource: MatTableDataSource<ProductElement>;
  action: string;
  product: ProductElement;
  target = 'product';
  constructor(private router: Router, private cookieService: CookieService,
              private dialog: MatDialog, private commonService: CommonService) {
    this.router.events.subscribe(() => {
    //  this.getData();
    });
  }

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
    // this.reset();
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
  getData() {
    this.commonService.get(this.target).subscribe(result => {
      const data: ProductElement[] = result.data;
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
