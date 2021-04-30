import { NgModule } from '@angular/core';
import {Routes, RouterModule, RouteReuseStrategy} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {UsersComponent} from './components/users/users.component';
import {ClientsComponent} from './components/clients/clients.component';
import {HomeComponent} from './components/home/home.component';
import {SimpleReuseStrategy} from './simple-reuse-strategy';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {ProductsComponent} from './components/products/products.component';
import {OrdersComponent} from './components/orders/orders.component';


const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent, data: {keep: false, key: 'login'}
  },
  {
    path: 'home', component: HomeComponent, children: [
      {
        path: 'client', component: ClientsComponent, data: {keep: false, key: 'clients'}
      },
      {
        path: 'employee', component: UsersComponent, data: {keep: false, key: 'users'}
      },
      {
        path: 'product', component: ProductsComponent, data: {keep: false, key: 'products'}
      },
      {
        path: 'commande', component: OrdersComponent, data: {keep: false, key: 'orders'}
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
