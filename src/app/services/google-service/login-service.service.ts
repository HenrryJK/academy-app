import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private oAuthSerice: OAuthService
  ) {
    this.initLogin();
   }

  initLogin(){
    const config: AuthConfig = {
      issuer: 'htts://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: '119368073120-e2jcckdelo7feckj5f7lvrhbnejfrjai.apps.googleusercontent.com',
      redirectUri: window.location.origin + '/home',
      scope: 'openid profile email',
      requireHttps: false,
    }
    this.oAuthSerice.configure(config);
    this.oAuthSerice.setupAutomaticSilentRefresh();
    this.oAuthSerice.loadDiscoveryDocumentAndTryLogin();
  }


  login(){
    this.oAuthSerice.initLoginFlow();
  }

  logout(){
    this.oAuthSerice.logOut();
  }

  getProfile(){
    return this.oAuthSerice.getIdentityClaims();
  }

}
