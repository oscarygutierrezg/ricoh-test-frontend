import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NobelListShowComponent } from './components/nobel-list-show/nobel-list-show.component';
import { NobelListComponent } from './components/nobel-list/nobel-list.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {  path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/nobeles', pathMatch: 'full' },
  {  path: 'nobeles', component: NobelListComponent , canActivate: [AuthGuard] },
  {  path: 'show/:id', component: NobelListShowComponent  , canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
