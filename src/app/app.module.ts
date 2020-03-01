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
import { ClientsComponent } from './components/clients/clients.component';
import { HomeComponent } from './components/home/home.component';
import {CookieService} from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    LoginComponent,
    ClientsComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonMaterialModule,
    HttpClientModule,
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    CookieService
    ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
