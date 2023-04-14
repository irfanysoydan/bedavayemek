import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { HomeComponent } from './modules/home/home.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { MainComponent } from './modules/main/main.component';
import { AuthGuard } from './core/auth/auth.guard';
import { GetPostsComponent } from './modules/post/get-posts/get-posts.component';
import { GetPostDetailsComponent } from './modules/post/get-post-details/get-post-details.component';

const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'posts', component: GetPostsComponent, canActivate: [AuthGuard] },
  {
    path: 'post/:id',
    component: GetPostDetailsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
