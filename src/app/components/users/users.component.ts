import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import {MatSort} from '@angular/material/sort';
import {CookieService} from 'ngx-cookie-service';
import {MatDialog} from '@angular/material/dialog';
import {CommonService} from '../../services/common/common.service';
import {CommonComponent} from '../common.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent extends CommonComponent {
  displayedColumns: string[] = ['id', 'name', 'age', 'operation'];
  target = 'user';
  constructor(router: Router, cookieService: CookieService,
              dialog: MatDialog, commonService: CommonService) {
    super(router, cookieService, dialog, commonService);
  }
}
