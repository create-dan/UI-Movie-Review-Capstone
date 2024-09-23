import { inject, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SingleMovieComponent } from './components/single-movie/single-movie.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { AuthService } from './services/authenticatin/auth.service';
import { AdminComponent } from './components/admin/admin.component';
import { map, Observable } from 'rxjs';
import { ProfileComponent } from './components/profile/profile.component';

export const guard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(AuthService).canActivate()
   
}
export const admin: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean => {
  return inject(AuthService).checkAdmin();

}

const routes: Routes = [
  {
    path:"",
    component:HomeComponent
  },
  {
    path:"login",
    component:LoginComponent,
    canActivate:[guard]
    
  },
  {
    path:"movies",
    component:MovieListComponent,
  },
  {
    path:"signup",
    component:SignupComponent,
    canActivate:[guard]
  },
  {
    path:"movie/:movieId",
    component:SingleMovieComponent
  },
  {
    path:"admin",
    component:AdminComponent,
    canActivate:[admin]
  }
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
