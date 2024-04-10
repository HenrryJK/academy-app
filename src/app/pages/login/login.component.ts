// import { FacebookLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import { LoginService } from 'src/app/services/google-service/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  readonly form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });



  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private msalService: MsalService

  ){}

  ngOnInit(): void {

  }
  onSubmit(){
    if (this.form.pristine) {
      this.form.markAllAsTouched();
  } else {
      if (this.form.valid) {

          const dataLogin = {
              username: this.form.value.username,
              password: this.form.value.password,
          };

          this.router.navigate(['/home']);
          this.form.patchValue({
              username: '',
              password: ''
          });
          this.form.markAllAsTouched();
          console.log('Value send form', dataLogin);
      } else {
          this.form.markAllAsTouched();
      }
  }
  }

  login(){
    this.loginService.login();
    console.log('Login with Google');
  }
  /// Verificar si la cuenta esta en sesion Microsoft
  isLoggedIn(): boolean{
    return this.msalService.instance.getActiveAccount() != null
  }

  loginMicrosoft(){
    this.msalService.loginPopup().subscribe((response: AuthenticationResult) =>{
      this.msalService.instance.setActiveAccount(response.account)
    });
  }

  logoutMicrosoft(){
    this.msalService.logout();
  }
}
