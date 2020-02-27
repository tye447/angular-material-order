import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UsersService} from '../../../../services/users/users.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-update-form-user',
  templateUrl: './update-form-user.component.html',
  styleUrls: ['./update-form-user.component.css']
})
export class UpdateFormUserComponent implements OnInit {
  updateForm: FormGroup;
  id: number;
  name: string;
  age: number;
  password: string;
  constructor(
    private userService: UsersService,
    public dialogRef: MatDialogRef<UpdateFormUserComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  ngOnInit() {
    this.updateForm = this.fb.group({
      id: [this.data.id],
      name: [this.data.name],
      age: [this.data.age],
      password: [this.data.password]
    });
  }
  updateData(addParam) {
    this.userService.update(addParam).subscribe(result => {
      console.log(result.data);
    });
  }
  save() {
    if (this.updateForm.invalid) {
      alert('error');
    } else {
      this.updateData(this.updateForm.value);
      setTimeout(() => {
        this.dialogRef.close(this.updateForm.value);
      }, 200);
    }
  }
  close() {
    this.dialogRef.close();
  }
}
