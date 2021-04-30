import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {CommonService} from '../../services/common/common.service';
import {CommonComponent} from '../common.component';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent extends CommonComponent{
  displayedColumns: string[] = ['id', 'client', 'product', 'employee', 'quantity', 'state', 'price_total' , 'operation'];
  target = 'commande';
  constructor(router: Router, dialog: MatDialog, commonService: CommonService) {
    super(router, dialog, commonService);
  }
  confirm(item) {
    this.commonService.confirm(item).subscribe(() => {
      this.commonService.switch(this.target);
    });
  }
}
