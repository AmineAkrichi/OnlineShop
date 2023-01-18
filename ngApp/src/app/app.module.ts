import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";


import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTableModule } from "@angular/material/table";
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import { MatMenuModule} from '@angular/material/menu';
import { MatBadgeModule } from "@angular/material/badge";
import { MatTabsModule } from "@angular/material/tabs";
import { MatSelectModule } from "@angular/material/select";

import { ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from './login/login.component';
import { FormsModule } from "@angular/forms";


import { SignupComponent } from './signup/signup.component';
import { AdminSpaceComponent } from './admin-space/admin-space.component';
import { UpdateDialogComponent } from './components/update-dialog/update-dialog.component';
import { CreateDialogComponent } from './components/create-dialog/create-dialog.component';
import { ShopFrontComponent } from './shop-front/shop-front.component';
import { AuthService } from './auth.service';
import { ProductService } from './product.service';
import { AuthGuard } from './auth.guard';
import { ShopingCartComponent } from './shoping-cart/shoping-cart.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ProductDialogComponent } from './components/product-dialog/product-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    AdminSpaceComponent,
    UpdateDialogComponent,
    CreateDialogComponent,
    ShopFrontComponent,
    ShopingCartComponent,
    FavoritesComponent,
    ProductDialogComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,

    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatMenuModule,
    MatBadgeModule,
    MatTabsModule,
    MatSelectModule
  ],
  providers: [AuthService,ProductService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
