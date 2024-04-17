import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { LoginService } from 'src/app/services/google-service/login-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  enviroment: string = 'http://localhost:4200/login';
  constructor(
    private router: Router,
    private loginService: LoginService,
    private msalService: MsalService,
  ){}


  showData(){
   const data = JSON.stringify(this.loginService.getProfile());
   console.log('Data', data);
  }

  logOut(){
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  logoutMicrosoft(){
    this.msalService.logout();
    this.router.navigate(['/login']);
    // this.msalService.logoutRedirect({postLogoutRedirectUri: this.enviroment});
  }

}
