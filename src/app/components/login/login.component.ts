import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from '../../services/login/login.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  name: string;
  password: string;
  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      name: [this.name],
      password: [this.password]
    });
  }
  login() {
    this.loginService.login(this.loginForm.value).subscribe(result => {
      if (result.message === 'success' && result.data !== null) {
        this.router.navigateByUrl('home/client').then();
        this.cookieService.set('user', this.loginForm.value.name);
      } else {
        alert('User is not found or invalid parameter to login, please retry!');
      }
    });
  }
}
