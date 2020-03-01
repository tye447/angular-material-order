import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ThemePalette} from '@angular/material/core';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  links = ['Client', 'User'];
  activeLink = this.links[0];
  background: ThemePalette = 'primary';
  constructor(private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
  }
  logOut() {
    this.router.navigate(['/login']).then();
    this.cookieService.delete('user');
  }

}
