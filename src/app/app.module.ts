import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import MaterialModules from './material.module';
import { HomeComponent } from './components/home/home.component';
import AppRoutingModule from './routing.module';
import { ProductHeaderComponent } from './components/product-header/product-header.component';
import { FiltersComponent } from './components/filters/filters.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { CartComponent } from './components/cart/cart.component';
import { CartService } from './services/cart.service';
import { StoreService } from './services/store.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProductHeaderComponent,
    FiltersComponent,
    ProductItemComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModules,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ CartService, StoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
