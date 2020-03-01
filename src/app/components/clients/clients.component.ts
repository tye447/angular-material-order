import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ClientsService} from '../../services/clients/clients.service';
import {FormBuilder, Validators} from '@angular/forms';
import {NavigationEnd, Router} from '@angular/router';
import {MatSort} from '@angular/material/sort';
import {CookieService} from 'ngx-cookie-service';

export interface ClientModel {
  id: number;
  name: string;
  description: string;
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
  createForm: any;
  updateForm: any;
  id: any;
  name: any;
  description: any;
  constructor(private clientsService: ClientsService, private fb: FormBuilder,
              private router: Router, private cookieService: CookieService) {
    this.router.events.subscribe(() => {
      this.reset();
    });
  }
  ngOnInit() {
    this.checkCookie();
  }
  checkCookie() {
    const cookie = this.cookieService.get('user');
    if (cookie !== null && cookie !== undefined && cookie.length > 0) {
      this.reset();
      this.getData();
    } else {
      this.router.navigateByUrl('login').then();
    }
  }
  reset() {
    this.id = '';
    this.name = '';
    this.description = '';
    if (document.getElementById('updateForm') !== null) {
      document.getElementById('updateForm').hidden = true;
    }
    if (document.getElementById('createForm') !== null) {
      document.getElementById('createForm').hidden = false;
    }
  }
  add() {
    this.reset();
  }
  update(item) {
    document.getElementById('updateForm').hidden = false;
    document.getElementById('createForm').hidden = true;
    this.id = item.id;
    this.name = item.name;
    this.description = item.description;
  }
  delete(item) {
    this.clientsService.delete(item).subscribe(() => {
      this.getData();
      this.reset();
    });
  }
  addClient() {
    this.buildFormCreate();
  }
  updateClient() {
    this.buildFormUpdate();
  }
  buildFormCreate() {
    this.createForm = this.fb.group({
      name: [this.name, Validators.required],
      description: [this.description, Validators.required]
    });
    if (this.createForm.valid) {
      this.clientsService.add(this.createForm.value).subscribe(() => this.getData());
    } else {
      alert('Field null exist! Please fill all fields!');
    }
  }
  buildFormUpdate() {
    this.updateForm = this.fb.group({
      id: [this.id, Validators.required],
      name: [this.name, Validators.required],
      description: [this.description, Validators.required]
    });
    if (this.updateForm.valid) {
      this.clientsService.add(this.updateForm.value).subscribe(() => this.getData());
    } else {
      alert('Field null exist! Please fill all fields!');
    }
  }
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


}
