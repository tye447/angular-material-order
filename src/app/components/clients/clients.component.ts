import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ClientsService} from '../../services/clients/clients.service';
import {FormBuilder, FormControl, NgForm, Validators} from '@angular/forms';
import {NavigationEnd, Router} from '@angular/router';
import {MatSort} from '@angular/material/sort';
import {CookieService} from 'ngx-cookie-service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {FormComponent} from '../form/form.component';

export interface ClientModel {
  id: any;
  name: any;
  description: any;
}
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = ['id', 'name', 'description', 'operation'];
  dataSource: MatTableDataSource<ClientModel>;
  action: string;
  client: ClientModel;
  target = 'client';
  constructor(private clientsService: ClientsService, private fb: FormBuilder,
              private router: Router, private cookieService: CookieService,
              private dialog: MatDialog) {
    /*this.router.events.subscribe(() => {
      this.resetForm();
    });*/
  }
  ngOnInit() {
    this.action = 'add';
    this.client = {id: '', name: '', description: ''};
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
  }
  update(item) {
    this.action = 'update';
    this.openDialog(item, this.action, this.target);
  }
  delete(item) {
    this.clientsService.delete(item).subscribe(() => {
      this.getData();
      this.action = 'add';
    });
  }
  /* onSubmit() {
    if (this.action === 'add') {
      this.form = this.fb.group({
        name: [this.name, Validators.required],
        description: [this.description, Validators.required]
      });
      if (this.form.valid) {
        this.clientsService.add(this.form.value).subscribe(res => this.getData());
      } else {
        alert('Field null exist! Please fill all fields!');
      }
    } else {
      this.form = this.fb.group({
        id: [this.id, Validators.required],
        name: [this.name, Validators.required],
        description: [this.description, Validators.required],
      });
      if (this.form.valid) {
        this.clientsService.update(this.form.value).subscribe(() => this.getData());
      } else {
        alert('Field null exist! Please fill all fields!');
      }
    }
  }*/
  getData() {
    this.clientsService.get().subscribe(result => {
      const data: ClientModel[] = result.data;
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
