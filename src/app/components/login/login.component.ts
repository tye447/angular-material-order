import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {CommonService} from '../../services/common/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private commonService: CommonService,
    private router: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
  }
  login(f: NgForm) {
    this.commonService.login(f.value).subscribe(result => {
      if (result.message === 'success' && result.data !== null) {
        this.router.navigateByUrl('home/client').then();
        this.cookieService.set('user', f.value.name);
      } else {
        alert('User is not found or invalid parameter to login, please retry!');
      }
    });
  }
}
