
import { NgModule } from "@angular/core";
import { LoginComponent } from "./login.component";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { LoginRoutingModule } from "./login.routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MsalService } from "@azure/msal-angular";
// import { OAuthModule } from "angular-oauth2-oidc";
// import { SocialLoginModule } from "@abacritt/angularx-social-login";




@NgModule({
  declarations: [
    LoginComponent

  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    MsalService
  ]
})

export class LoginModule { }
