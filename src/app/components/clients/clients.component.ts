import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import {MatSort} from '@angular/material/sort';
import {CookieService} from 'ngx-cookie-service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {FormComponent} from '../form/form.component';
import {CommonService} from '../../services/common/common.service';
import {CommonComponent} from '../common.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent extends CommonComponent {
  displayedColumns: string[] = ['id', 'name', 'description', 'operation'];
  target = 'client';
  constructor(router: Router, cookieService: CookieService,
              dialog: MatDialog, commonService: CommonService) {
    super(router, cookieService, dialog, commonService);
  }
}
