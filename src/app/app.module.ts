import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { MsalModule, MsalService, MSAL_INSTANCE, MsalInterceptor, MsalGuard, MsalRedirectComponent } from '@azure/msal-angular';
import { IPublicClientApplication, InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';


// export function MSAInstanceFactory(): IPublicClientApplication{
//     return new PublicClientApplication({
//       auth: {
//         clientId: 'ea071adc-5b9b-436f-b8fe-542ea94eb188',
//         redirectUri: 'http://localhost:4200'
//       },
//     })

// }

const isIE=window.navigator.userAgent.indexOf('MSIE')>-1 ||window.navigator.userAgent.indexOf('Trident/')>-1

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    MsalModule.forRoot(new PublicClientApplication(
      {
        auth: {
          clientId: 'ea071adc-5b9b-436f-b8fe-542ea94eb188',
          redirectUri: 'http://localhost:4200',
          authority: 'https://login.microsoftonline.com/f96560ac-da5f-4f58-8af2-a4459f9590b6'
        },
        cache:{
          cacheLocation: 'localStorage',
          storeAuthStateInCookie: isIE
        }
      }
    ),
    {
      interactionType: InteractionType.Redirect,
      authRequest: {
        scopes: ['user.read']
      }
    },
    {
      interactionType: InteractionType.Redirect,
      protectedResourceMap: new Map(
        [
          ['https://graph.microsoft.com/v1.0/me',['user.Read']]
        ]
      )
    }
),
    ReactiveFormsModule,
    SocialLoginModule

  ],
  providers: [
    // {
    //   provide: 'SocialAuthServiceConfig',
    //   useValue: {
    //     autoLogin: true,
    //     providers: [
    //       {
    //         id: FacebookLoginProvider.PROVIDER_ID,
    //         provider: new FacebookLoginProvider('744938157621931')
    //       }
    //     ],
    //     onError: (err) => {
    //       console.error(err);
    //     }
    //   } as SocialAuthServiceConfig,
    // },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('439804315130167')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalGuard
    // {
    //   provide: MSAL_INSTANCE,
    //   useFactory: MSAInstanceFactory
    // },
    // MsalService,

  ],
  bootstrap: [AppComponent , MsalRedirectComponent]
})
export class AppModule { }
