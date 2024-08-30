import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { MainComponent } from "./components/main/main.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { LoginComponent } from "./components/public/login/login.component";
import { SignupComponent } from "./components/public/signup/signup.component";

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route redirects to login
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'main',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirect empty path to 'home'
      { path: 'home', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
    ],
  },
];
