import type { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ApplicationsComponent } from './pages/applications/applications.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  { path: '', component: ApplicationsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];
