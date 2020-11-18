import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) // private token: TokenService,
  // private startup: StartupService,
  // private settings: SettingsService
  {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('ng-matero')]],
      password: ['', [Validators.required, Validators.pattern('ng-matero')]],
    });
  }

  ngOnInit() {}

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    // const { token, uid, username } = { token: 'ng-matero-token', uid: 1, username: 'ng-matero' };
    // // Set user info
    // this.settings.setUser({
    //   id: uid,
    //   name: 'Zongbin',
    //   email: 'nzb329@163.com',
    //   avatar: '/assets/images/avatar.jpg',
    // });
    // // Set token info
    // this.token.set({ token, uid, username });
    // // Regain the initial data
    // this.startup.load().then(() => {
    //   let url = this.token.referrer!.url || '/';
    //   if (url.includes('/auth')) {
    //     url = '/';
    //   }
    //   this.router.navigateByUrl(url);
    // });
  }
}
