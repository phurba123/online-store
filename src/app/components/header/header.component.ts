import { Component, Input, OnInit } from '@angular/core';
import { cart, cartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private _cart:cart ={items:[]};
  totalQuantity: number = 0;

  @Input() get cart(): cart {
    return this._cart;
  }
  set cart( cart: cart| null) {
    if (cart) {
      this._cart = cart;

      this.totalQuantity = cart.items.map((item: cartItem) => item.quantity).reduce((prev,current) =>prev+current, 0);
    }

    console.log('total quantity : ', this.totalQuantity)
  }

  constructor( private _cartService: CartService) { }

  ngOnInit(): void {
  }

  getTotal(cartItems: cartItem[]): number {
    return this._cartService.getTotal(cartItems);
  }

  clearCart(): void {
    this._cartService.clearCart();
  }

}
