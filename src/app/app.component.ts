import { Component, OnInit } from '@angular/core';
import { cart } from './models/cart.model';
import { Observable } from 'rxjs';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Online_Store';
  $cart!: Observable<cart>;

  constructor( private _cartService: CartService) {}

  ngOnInit(): void {
    this.$cart = this._cartService.cart;
  }
}
