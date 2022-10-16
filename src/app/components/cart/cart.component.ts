import { Component, OnDestroy, OnInit } from '@angular/core';
import { cart, cartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { Subject, takeUntil } from 'rxjs';

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

  constructor(private _cartService: CartService) { }

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

  ngOnDestroy(): void {
    this.$destroy.next(true);
    this.$destroy.complete();
  }

}
