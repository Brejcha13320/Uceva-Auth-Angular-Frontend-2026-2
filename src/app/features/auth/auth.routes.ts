import { Routes } from '@angular/router';
import { ForgotPasswordPage } from './pages/forgot-password/forgot-password.page';
import { LoginPage } from './pages/login/login.page';
import { RegisterPage } from './pages/register/register.page';
import { ResetPasswordPage } from './pages/reset-password/reset-password.page';

export const routes: Routes = [
    { path: 'login', component: LoginPage },
    { path: 'register', component: RegisterPage },
    { path: 'forgot-password', component: ForgotPasswordPage },
    { path: 'reset-password', component: ResetPasswordPage },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' }
];
