import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AuthGuard } from './_guards';
import {RegistrationComponent} from './registration/registration.component';
// canActivate: [AuthGuard]
const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
