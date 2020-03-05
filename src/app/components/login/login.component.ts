import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from '../../services/login/login.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
  }
  login(f: NgForm) {
    console.log(f.value);
    this.loginService.login(f.value).subscribe(result => {
      if (result.message === 'success' && result.data !== null) {
        this.router.navigateByUrl('home/client').then();
        this.cookieService.set('user', f.value.name);
      } else {
        alert('User is not found or invalid parameter to login, please retry!');
      }
    });
  }
}
