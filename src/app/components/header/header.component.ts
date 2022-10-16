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
    console.log('setting cart : ', cart)
    if (cart) {
      console.log('if part')
      this._cart = cart;

      this.totalQuantity = cart.items.map((item: cartItem) => item.quantity).reduce((prev,current) =>prev+current, 0);
    }
  }

  constructor( private _cartService: CartService) { }

  ngOnInit(): void {
    console.log('received cart : ', this.cart)
  }

  getTotal(cartItems: cartItem[]): number {
    return this._cartService.getTotal(cartItems);
  }

  clearCart(): void {
    this._cartService.clearCart();
  }

}
