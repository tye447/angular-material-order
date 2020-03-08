import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {FormComponent} from '../form/form.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {CommonService} from '../../services/common/common.service';
import {CommonComponent} from '../common.component';

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
export class ProductsComponent extends CommonComponent {
  displayedColumns: string[] = ['id', 'name', 'stock', 'price', 'operation'];
  target = 'product';
  constructor(router: Router, cookieService: CookieService,
              dialog: MatDialog, commonService: CommonService) {
    super(router, cookieService, dialog, commonService);
  }
}
