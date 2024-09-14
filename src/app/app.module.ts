import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { SingleReviewComponent } from './components/single-review/single-review.component';
import { AddReviewComponent } from './components/add-review/add-review.component';
import { SingleMovieComponent } from './components/single-movie/single-movie.component';
import { MovieCarouselComponent } from './components/movie-carousel/movie-carousel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { ImageRendererComponent } from './components/renderers/image-renderer/image-renderer';
import { ButtonRendererComponent } from './components/renderers/button-renderer/button-renderer';
import { AuthService } from './services/authenticatin/auth.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    NavbarComponent,
    MovieDetailComponent,
    SingleReviewComponent,
    AddReviewComponent,
    SingleMovieComponent,
    MovieCarouselComponent,
    MovieListComponent,
    SingleMovieComponent,
    ImageRendererComponent,
    ButtonRendererComponent
    
   
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AgGridAngular,
    HttpClientModule,
    AgGridModule  
  
  
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
 
 }
