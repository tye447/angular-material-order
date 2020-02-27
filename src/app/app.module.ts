import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CommonMaterialModule} from './common.material.module';
import {HttpClientModule} from '@angular/common/http';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import { CreateFormUserComponent } from './components/forms/users/create-form-user/create-form-user.component';
import { UpdateFormUserComponent } from './components/forms/users/update-form-user/update-form-user.component';
import { ClientsComponent } from './components/clients/clients.component';
import { CreateFormClientComponent } from './components/forms/clients/create-form-client/create-form-client.component';
import { UpdateFormClientComponent } from './components/forms/clients/update-form-client/update-form-client.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    LoginComponent,
    CreateFormUserComponent,
    UpdateFormUserComponent,
    ClientsComponent,
    CreateFormClientComponent,
    UpdateFormClientComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonMaterialModule,
    HttpClientModule,
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
