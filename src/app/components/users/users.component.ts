import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {UsersService} from '../../services/users/users.service';
import {CreateFormUserComponent} from '../forms/users/create-form-user/create-form-user.component';
import {UpdateFormUserComponent} from '../forms/users/update-form-user/update-form-user.component';

export interface UserElement {
  id: number;
  name: string;
  age: string;
}
const data: UserElement[] = [];
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns: string[] = ['id', 'name', 'age', 'operation'];
  dataSource: MatTableDataSource<UserElement>;

  constructor(private usersService: UsersService, private dialog: MatDialog) { }
  ngOnInit() {
    this.getData();
  }

  getData() {
    this.usersService.get().subscribe(result => {
      data.length = 0;
      this.createClientElement(data, result.data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  deleteData(item) {
    this.usersService.delete(item).subscribe(result => {
      console.log(result.data);
    });
  }
  createClientElement(dataClient: UserElement[], dataResult: any[]) {
    dataResult.forEach(item => {
      dataClient.push(item);
    });
  }
  openForm(formComponent, dialogConfig: MatDialogConfig) {
    const dialogRef = this.dialog.open(formComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.getData();
    });
  }
  openCreateForm() {
    const dialogConfigCreate = new MatDialogConfig();
    dialogConfigCreate.disableClose = true;
    dialogConfigCreate.autoFocus = true;
    this.openForm(CreateFormUserComponent, dialogConfigCreate);
  }
  openUpdateForm(item) {
    const dialogConfigUpdate = new MatDialogConfig();
    dialogConfigUpdate.disableClose = true;
    dialogConfigUpdate.autoFocus = true;
    dialogConfigUpdate.data = item;
    this.openForm(UpdateFormUserComponent, dialogConfigUpdate);
  }
  delete(item) {
    console.log((item.id));
    this.deleteData(item);
    setTimeout(() => {
      this.getData();
    }, 200);
    // this.getData();
  }
  log(object) {
    console.log(object);
  }

}
