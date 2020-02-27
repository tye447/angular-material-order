import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {UsersService} from '../../../../services/users/users.service';

@Component({
  selector: 'app-create-form-user',
  templateUrl: './create-form-user.component.html',
  styleUrls: ['./create-form-user.component.css']
})
export class CreateFormUserComponent implements OnInit {
  createForm: FormGroup;
  name: string;
  age: number;
  password: string;
  constructor(
    private userService: UsersService,
    public dialogRef: MatDialogRef<CreateFormUserComponent>,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm = this.fb.group({
      name: [this.name],
      age: [this.age],
      password: [this.password]
    });
  }
  addData(addParam) {
    this.userService.add(addParam).subscribe(result => {
      console.log(result.data);
    });
  }
  save() {
    if (this.createForm.invalid) {
      alert('error');
    } else {
      this.addData(this.createForm.value);
      setTimeout(() => {
        this.dialogRef.close(this.createForm.value);
      }, 200);
    }
  }
  close() {
    this.dialogRef.close();
  }
}
