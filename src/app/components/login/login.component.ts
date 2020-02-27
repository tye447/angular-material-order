import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from '../../services/login/login.service';

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
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      name: [this.name],
      password: [this.password]
    });
  }
  login() {
    this.loginService.login(this.loginForm.value).subscribe(result => {
      console.log(result.message);
      if (result.message === 'success') {
        this.router.navigateByUrl('home/client').then();
      }
    });
  }
}
