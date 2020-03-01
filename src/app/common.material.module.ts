import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {NgModule} from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatSortModule} from '@angular/material/sort';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  imports: [
    MatToolbarModule,
    MatTabsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatGridListModule,
    MatOptionModule,
    MatSelectModule,
    MatSortModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MatToolbarModule,
    MatTabsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatGridListModule,
    MatOptionModule,
    MatSelectModule,
    MatSortModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class CommonMaterialModule { }
