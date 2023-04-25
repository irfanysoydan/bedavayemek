import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { HomeComponent } from './modules/home/home.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { MainComponent } from './modules/main/main.component';
import { AuthGuard } from './core/auth/auth.guard';
import { GetPostsComponent } from './modules/post/get-posts/get-posts.component';
import { GetPostDetailsComponent } from './modules/post/get-post-details/get-post-details.component';
import { CreatePostComponent } from './modules/post/create-post/create-post.component';
import { GetReviewDetailsComponent } from './modules/review/get-review-details/get-review-details.component';
import { EditPostComponent } from './modules/post/edit-post/edit-post.component';
import { GetReviewsComponent } from './modules/review/get-reviews/get-reviews.component';
import { EditReviewComponent } from './modules/review/edit-review/edit-review.component';

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
  {
    path: 'create-post',
    component: CreatePostComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-post/:id',
    component: EditPostComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'review/:id',
    component: GetReviewDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'reviews',
    component: GetReviewsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-review/:id',
    component: EditReviewComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
