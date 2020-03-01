import { NgModule } from '@angular/core';
import {Routes, RouterModule, RouteReuseStrategy} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {UsersComponent} from './components/users/users.component';
import {ClientsComponent} from './components/clients/clients.component';
import {HomeComponent} from './components/home/home.component';
import {SimpleReuseStrategy} from './simple-reuse-strategy';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';


const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent, data: {keep: true, key: 'login'}
  },
  {
    path: 'home', component: HomeComponent, children: [
      {
        path: 'client', component: ClientsComponent, data: {keep: true, key: 'clients'}
      },
      {
        path: 'user', component: UsersComponent, data: {keep: true, key: 'users'}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {provide: RouteReuseStrategy, useClass: SimpleReuseStrategy }
  ]
})
export class AppRoutingModule { }
