import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  links = ['Client', 'Employee', 'Product', 'Commande'];
  activeLink = this.links[0];
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  logOut() {
    this.router.navigate(['/login']).then();
    window.sessionStorage.removeItem('user');
  }

}
