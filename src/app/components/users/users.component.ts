import {Component} from '@angular/core';
import {Router} from '@angular/router';
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
  target = 'employee';
  constructor(router: Router, dialog: MatDialog, commonService: CommonService) {
    super(router, dialog, commonService);
  }
}
