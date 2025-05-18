import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ApplicationsComponent } from './pages/applications/applications.component';

export const routes: Routes = [
  { path: '', component: ApplicationsComponent },
  { path: 'home', component: HomeComponent },
];