
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { MsalGuard } from '@azure/msal-angular';
import { ProfileComponent } from './components/profile/profile.component';




const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [MsalGuard]
  },
  {
    path: '',
    component: HomeComponent,
  }

];




@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})

export class HomeRoutingModule { }
