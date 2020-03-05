import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ClientsService} from '../../services/clients/clients.service';
import {MatTableDataSource} from '@angular/material/table';
import {ClientModel} from '../clients/clients.component';
import {UsersService} from '../../services/users/users.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form: FormGroup;
  action: string;
  target: string;
  item: any;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FormComponent>,
    private clientsService: ClientsService,
    private usersService: UsersService,
    @Inject(MAT_DIALOG_DATA) data) {
    this.item = data.item;
    this.target = data.target;
    this.action = data.action;
  }

  ngOnInit() {
    if (this.target === 'client') {
      this.form = this.fb.group({
        id: [this.item.id, []],
        name: [this.item.name, []],
        description: [this.item.description, []]
      });
    } else {
      this.form = this.fb.group({
        id: [this.item.id, []],
        name: [this.item.name, []],
        age: [this.item.age, []],
        password: [this.item.password, []]
      });
    }
  }
  save() {
    if (this.target === 'client') {
      if (this.action === 'add') {
        this.clientsService.add(this.form.value).subscribe(res => {
          this.dialogRef.close();
        });
      } else {
        this.clientsService.update(this.form.value).subscribe(res => {
          this.dialogRef.close();
        });
      }
    } else {
      if (this.action === 'add') {
        this.usersService.add(this.form.value).subscribe(res => {
          this.dialogRef.close();
        });
      } else {
        this.usersService.update(this.form.value).subscribe(res => {
          this.dialogRef.close();
        });
      }
    }
  }
  close() {
    this.dialogRef.close();
  }
}
