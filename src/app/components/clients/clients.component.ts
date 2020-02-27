import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ClientsService} from '../../services/clients/clients.service';
import {CreateFormClientComponent} from '../forms/clients/create-form-client/create-form-client.component';
import {UpdateFormClientComponent} from '../forms/clients/update-form-client/update-form-client.component';

export interface ClientModel {
  id: number;
  name: string;
  description: string;
}
const data: ClientModel[] = [];

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns: string[] = ['id', 'name', 'description', 'operation'];
  dataSource: MatTableDataSource<ClientModel>;
  constructor(private clientsService: ClientsService, private dialog: MatDialog) { }


  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.clientsService.get().subscribe(result => {
      data.length = 0;
      this.createClientElement(data, result.data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  deleteData(item) {
    this.clientsService.delete(item).subscribe(result => {
      console.log(result.data);
    });
  }
  createClientElement(dataClient: ClientModel[], dataResult: any[]) {
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
    this.openForm(CreateFormClientComponent, dialogConfigCreate);
  }
  openUpdateForm(item) {
    const dialogConfigUpdate = new MatDialogConfig();
    dialogConfigUpdate.disableClose = true;
    dialogConfigUpdate.autoFocus = true;
    dialogConfigUpdate.data = item;
    this.openForm(UpdateFormClientComponent, dialogConfigUpdate);
  }
  delete(item) {
    console.log((item.id));
    this.deleteData(item);
    setTimeout(() => {
      this.getData();
    }, 200);
  }

}
