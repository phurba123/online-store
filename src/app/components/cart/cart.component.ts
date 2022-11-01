import { Component, OnDestroy, OnInit } from '@angular/core';
import { cart, cartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { Subject, takeUntil } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';
import {loadStripe} from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  cart!: cart ;

  cartDataSource: cartItem[] = [];
  displayedCol: string[] = ['product', 'name', 'price', 'quantity', 'total', 'action'];

  $destroy: Subject<boolean> = new Subject<boolean>();

  constructor(private _cartService: CartService, private _storeService: StoreService) { }

  ngOnInit(): void {
    this._cartService.cart.pipe(takeUntil(this.$destroy)).subscribe((_cart) => {
    this.cart = _cart;
    this.cartDataSource = _cart.items;
  });
  }

  getTotal(items: cartItem[]): number {
    return this._cartService.getTotal(items);
  }

  increaseQuantity(item: cartItem): void {
    this._cartService.addToCart(item);
  }

  decreaseQuantity(item: cartItem): void {
    this._cartService.removeQuantity(item);
  }

  clearCart(): void {
    this._cartService.clearCart();
  }

  removeItemFromCart(item: cartItem) {
    this._cartService.removeFromCart(item);
  }

  checkout(): void {
    this._storeService.onCheckout(this.cart.items).subscribe(
      async(res: any) => {
        const stripe = await loadStripe(environment.stripe_pub_key);
        stripe?.redirectToCheckout({
          sessionId: res.id
        })
      }
    )
  }

  ngOnDestroy(): void {
    this.$destroy.next(true);
    this.$destroy.complete();
  }

}
