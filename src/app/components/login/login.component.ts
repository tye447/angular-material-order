import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {CommonService} from '../../services/common/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private commonService: CommonService,
    private router: Router  ) { }

  ngOnInit() {
  }
  login(f: NgForm) {
    this.commonService.login(f.value).subscribe(result => {
      if (result.message === 'success' && result.data !== null) {
        window.sessionStorage.setItem('user', f.value.name);
        this.router.navigateByUrl('home/client').then();
      } else {
        alert('User is not found or invalid parameter to login, please retry!');
      }
    });
  }
}
