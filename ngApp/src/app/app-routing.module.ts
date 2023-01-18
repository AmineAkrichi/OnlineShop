import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminSpaceComponent } from './admin-space/admin-space.component';
import { AdminGuard } from './admin.guard';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { FavoritesComponent } from './favorites/favorites.component';
import { LoginComponent } from './login/login.component';
import { ShopFrontComponent } from './shop-front/shop-front.component';
import { ShopingCartComponent } from './shoping-cart/shoping-cart.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: '/shopFront',
    pathMatch:'full'
    
  },
  {
    path:'shopFront',
    component:ShopFrontComponent,
  },
  {
    path:'login',
    component:LoginComponent,
  },
  {
    path:'signup',
    component:SignupComponent,
  },
  {
    path:'admin',
    component:AdminSpaceComponent,
    canActivate:[AdminGuard]
  },
  {
    path:'shopingCart',
    component:ShopingCartComponent,
    canActivate:[AuthGuard],
  },
  {
    path: 'favorites',
    component:FavoritesComponent,
    canActivate:[AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
