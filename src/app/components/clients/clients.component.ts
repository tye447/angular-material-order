import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
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
  constructor(router: Router, dialog: MatDialog, commonService: CommonService) {
    super(router, dialog, commonService);
  }
}
