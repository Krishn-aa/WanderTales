import { Routes } from '@angular/router';
import { LoginComponent } from './components/public/login/login.component';
import { SignupComponent } from './components/public/signup/signup.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route redirects to login
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
];
