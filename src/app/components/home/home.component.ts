import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  links = ['Client', 'User', 'Product', 'Order'];
  activeLink = this.links[0];
  constructor(private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
  }
  logOut() {
    this.router.navigate(['/login']).then();
    this.cookieService.delete('user');
  }

}
