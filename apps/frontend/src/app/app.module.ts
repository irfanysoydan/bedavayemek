import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { PostService } from './services/post.service';
import { ReviewService } from './services/review.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { HomeComponent } from './modules/home/home.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { MainComponent } from './modules/main/main.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';

import { HeaderComponent } from './layouts/header/header.component';
import { SideabarComponent } from './layouts/sidebar/sidebar.component';
import { HeaderAuthComponent } from './layouts/header-auth/header-auth.component';
import { GetPostsComponent } from './modules/post/get-posts/get-posts.component';
import { CreatePostComponent } from './modules/post/create-post/create-post.component';
import { GetPostDetailsComponent } from './modules/post/get-post-details/get-post-details.component';
import { GetReviewDetailsComponent } from './modules/review/get-review-details/get-review-details.component';
import { EditPostComponent } from './modules/post/edit-post/edit-post.component';
import { GetReviewsComponent } from './modules/review/get-reviews/get-reviews.component';
import { EditReviewComponent } from './modules/review/edit-review/edit-review.component';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

const httpOptions: HttpHeaders = new HttpHeaders({
  Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
});

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    MainComponent,
    HeaderComponent,
    SideabarComponent,
    HeaderAuthComponent,
    GetPostsComponent,
    CreatePostComponent,
    GetPostDetailsComponent,
    GetReviewDetailsComponent,
    EditPostComponent,
    GetReviewsComponent,
    EditReviewComponent,
  ],
  imports: [
    ApolloModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatListModule,
    MatProgressBarModule,
    MatSelectModule,
    MatMenuModule,
  ],
  providers: [
    AuthService,
    PostService,
    ReviewService,
    MatSnackBar,

    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'http://localhost:3333/graphql',
            headers: httpOptions,
          }),
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
