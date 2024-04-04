import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/google-service/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  readonly form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });



  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ){}

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
}
