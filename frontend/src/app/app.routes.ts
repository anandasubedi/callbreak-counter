import { AuthGuard } from './auth/auth.guard';
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './auth/login.component';
import {RegisterComponent} from './auth/register.component';

const appRoutes: Routes =
  [
    {
      path: '',
      component: HomeComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'register',
      component: RegisterComponent
    }
  ];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
