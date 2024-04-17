// import { FacebookLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { FacebookLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { AuthenticationResult, InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { Subject, filter, takeUntil } from 'rxjs';
import { LoginService } from 'src/app/services/google-service/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  readonly form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  // user:SocialUser | undefined;
  // loggedIn: boolean | undefined;
  // isLoggedin?: boolean = undefined;
  user:any;
  loggedIn:any;

  isUserLoggedIn: boolean = false;
  private readonly _destroy = new Subject<void>();
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService:SocialAuthService,
    private loginService: LoginService,
    private msalService: MsalService,
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private msalBroadCastService: MsalBroadcastService

  ){}

  ngOnInit(): void {
    /// Microsft Azure ------- <
      this.msalBroadCastService.inProgress$.pipe(filter((interactionStatus:InteractionStatus) =>
      interactionStatus == InteractionStatus.None),
      takeUntil(this._destroy))
      .subscribe( x => {
        this.isUserLoggedIn = this.msalService.instance.getAllAccounts().length>0
      })
    //// Microsoft Azure ----- >

    /// Facebook ------ <
    this.authService.authState.subscribe((user) =>{
      this.user = user;
      console.log('User' , this.user);
      this.loggedIn = (user != null);
    });
    /// Facebook ----- >

  }

  ngOnDestroy(): void {
    this._destroy.next(undefined);
    this._destroy.complete();
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
  // isLoggedIn(): boolean{
  //   return this.msalService.instance.getActiveAccount() != null
  // }

  loginMicrosoft(){
    // this.msalService.loginRedirect();
    this.msalService.loginPopup().subscribe((response: AuthenticationResult) =>{
      this.msalService.instance.setActiveAccount(response.account),
      this.router.navigate(['home'])
    });

    // if (this.msalGuardConfig.authRequest) {
    //   this.msalService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest),
    // } else {
    //   this.msalService.loginRedirect();
    // }
  }

  // logoutMicrosoft(){
  //   this.msalService.logout();
  //   // this.msalService.logoutRedirect();
  // }

  //Facebook Login
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  // refreshToken(): void {
  //   this.ssoauthService.refreshAuthToken(FacebookLoginProvider.PROVIDER_ID);
  // }


}
