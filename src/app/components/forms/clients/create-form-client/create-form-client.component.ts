import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ClientsService} from '../../../../services/clients/clients.service';
import {UpdateFormClientComponent} from '../update-form-client/update-form-client.component';

@Component({
  selector: 'app-create-form-client',
  templateUrl: './create-form-client.component.html',
  styleUrls: ['./create-form-client.component.css']
})
export class CreateFormClientComponent implements OnInit {
  createForm: FormGroup;
  name: string;
  description: string;
  constructor(
    private clientService: ClientsService,
    public dialogRef: MatDialogRef<CreateFormClientComponent>,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
  addData(addParam) {
    this.clientService.add(addParam).subscribe(result => {
      console.log(result.data);
    });
  }
  save() {
    if (this.createForm.invalid) {
      alert('Invalid name or description !');
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
