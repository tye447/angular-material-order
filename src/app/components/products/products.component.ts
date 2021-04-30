import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
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
  constructor(router: Router, dialog: MatDialog, commonService: CommonService) {
    super(router, dialog, commonService);
  }
}
