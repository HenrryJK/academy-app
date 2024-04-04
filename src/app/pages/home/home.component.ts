import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/google-service/login-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(
    private router: Router,
    private loginService: LoginService
  ){}


  showData(){
   const data = JSON.stringify(this.loginService.getProfile());
   console.log('Data', data);
  }

  logOut(){
    this.loginService.logout();
    this.router.navigate(['/login'])
  }

}
