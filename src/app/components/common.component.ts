import { OnInit, ViewChild, Directive } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CommonService} from '../services/common/common.service';
import {FormComponent} from './form/form.component';

@Directive()
export class CommonComponent implements OnInit{
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTableDataSource, {static: true}) dataSource: MatTableDataSource<any>;
  action: string;
  target: string;
  router: Router;
  cookieService: CookieService;
  dialog: MatDialog;
  commonService: CommonService;
  constructor(router: Router, cookieService: CookieService,
              dialog: MatDialog, commonService: CommonService) {
    this.router = router;
    this.cookieService = cookieService;
    this.dialog = dialog;
    this.commonService = commonService;
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
  getData() {
    this.commonService.get(this.target).subscribe(result => {
      const dataSource = new MatTableDataSource(result.data);
      dataSource.paginator = this.paginator;
      dataSource.sort = this.sort;
      this.dataSource = dataSource;
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
    dialogConfig.data = {action, item, target};
    const dialogRef = this.dialog.open(FormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.commonService.switch(this.target);
    });
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
      this.commonService.switch(this.target);
    });
  }
}
