import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { MainComponent } from "./components/main/main.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { LoginComponent } from "./components/public/login/login.component";
import { SignupComponent } from "./components/public/signup/signup.component";
import { LandingPageComponent } from "./components/landing-page/landing-page.component";
import { SearchComponent } from "./components/search/search.component";

export const routes: Routes = [
  {path : '', component:LandingPageComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'main',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path : 'search', component:SearchComponent},
    ],
  },
];
