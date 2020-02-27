import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ClientsService} from '../../../../services/clients/clients.service';

@Component({
  selector: 'app-update-form-client',
  templateUrl: './update-form-client.component.html',
  styleUrls: ['./update-form-client.component.css']
})
export class UpdateFormClientComponent implements OnInit {
  updateForm: FormGroup;
  id: number;
  name: string;
  description: string;
  constructor(
    private clientService: ClientsService,
    public dialogRef: MatDialogRef<UpdateFormClientComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  ngOnInit() {
    this.updateForm = this.fb.group({
      id: [this.data.id],
      name: [this.data.name],
      description: [this.data.description]
    });
  }
  updateData(addParam) {
    this.clientService.update(addParam).subscribe(result => {
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
