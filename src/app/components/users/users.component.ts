import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {UsersService} from '../../services/users/users.service';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSort} from '@angular/material/sort';
import {CookieService} from 'ngx-cookie-service';

export interface UserElement {
  id: number;
  name: string;
  age: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = ['id', 'name', 'age', 'operation'];
  dataSource: MatTableDataSource<UserElement>;
  createForm: any;
  updateForm: any;
  id: any;
  name: any;
  age: any;
  password: any;
  constructor(private usersService: UsersService, private fb: FormBuilder,
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
    this.id = null;
    this.name = null;
    this.age = null;
    this.password = null;
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
    this.age = item.age;
    this.password = item.password;
  }
  delete(item) {
    this.usersService.delete(item).subscribe(() => {
      this.getData();
      this.reset();
    });
  }
  addUser() {
    this.buildFormCreate();
  }
  updateUser() {
    this.buildFormUpdate();
  }
  buildFormCreate() {
    this.createForm = this.fb.group({
      name: [this.name, Validators.required],
      age: [this.age, Validators.required],
      password: [this.password, Validators.required]
    });
    if (this.createForm.valid) {
      this.usersService.add(this.createForm.value).subscribe(res => {
        this.getData();
      });
    } else {
      alert('Field null exist! Please fill all fields!');
    }
  }
  buildFormUpdate() {
    this.updateForm = this.fb.group({
      id: [this.id, Validators.required],
      name: [this.name, Validators.required],
      age: [this.age, Validators.required],
      password: [this.password, Validators.required]
    });
    if (this.updateForm.valid) {
      this.usersService.update(this.updateForm.value).subscribe(() => this.getData());
    } else {
      alert('Field null exist! Please fill all fields!');
    }
  }
  getData() {
    this.usersService.get().subscribe(result => {
      const data: UserElement[] = result.data;
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
