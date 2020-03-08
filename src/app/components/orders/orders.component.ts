import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CommonService} from '../../services/common/common.service';
import {FormComponent} from '../form/form.component';
import {CommonComponent} from '../common.component';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent extends CommonComponent{
  displayedColumns: string[] = ['id', 'client', 'product', 'employee', 'quantity', 'state', 'price_total' , 'operation'];
  target = 'order';
  constructor(router: Router, cookieService: CookieService,
              dialog: MatDialog, commonService: CommonService) {
    super(router, cookieService, dialog, commonService);
  }
  confirm(item) {
    this.commonService.confirm(item).subscribe(result => {
      this.commonService.switch(this.target);
    });
  }
}
