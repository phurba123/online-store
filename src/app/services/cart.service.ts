import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { cart, cartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = new BehaviorSubject<cart>({ items: [] });

  constructor(private _snackBar: MatSnackBar) {}

  /**
   * 
   * @param item : new item object to be stored
   * if item with same id is already present in cart items then just increase its quantity
   * else add a new item object in a cart
   */
  addToCart(item: cartItem): void {
    const items = [...this.cart.value.items];

    const itemInCart = items.find((_item) => _item.id === item.id);
    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }

    this.cart.next({ items });
    this._snackBar.open('1 item added to cart.', 'Ok', { duration: 3000 });
  }

  /**
   * sercice method for removing an item from a cart
   * 
   * @param item , item object to be removed
   * @param updateCart:boolean , conditional updation of cart, 
   *       default is true 
   * @returns new items array with item provided removed 
   */
  removeFromCart(item: cartItem, updateCart = true): cartItem[] {
    const filteredItems = this.cart.value.items.filter(
      (_item) => _item.id !== item.id
    );

    if (updateCart) {
      this.cart.next({ items: filteredItems });
      this._snackBar.open('1 item removed from cart.', 'Ok', {
        duration: 3000,
      });
    }

    return filteredItems;
  }

  /**
   * 
   * @param item ,item object whose quantity needs to be decreased
   */
  removeQuantity(item: cartItem): void {
    let itemForRemoval!: cartItem;

    let filteredItems = this.cart.value.items.map((_item: cartItem) => {
      if (_item.id === item.id) {
        _item.quantity--;
        // when quantity becomes 0, set that item for removal
        if (_item.quantity === 0) {
          itemForRemoval = _item;
        }
      }

      return _item;
    });

    if (itemForRemoval) {
      /* calling remove from cart method if no of quantity become 0, passing update cart argument as false
       because user will be notified from this method only, no need to duplicate stuff
      */
      filteredItems = this.removeFromCart(itemForRemoval, false);
    }

    // notifying changed cart items
    this.cart.next({ items: filteredItems });
    this._snackBar.open('1 item removed from cart.', 'Ok', {
      duration: 3000,
    });
  }

  /**
   * method for clearing a cart completely, emitting empty array of items
   */
  clearCart(): void {
    this.cart.next({ items: [] });
    this._snackBar.open('Cart is cleared.', 'Ok', {
      duration: 3000,
    });
  }

  /**
   * method for getting a total price of array of items
   * @param items , array of items
   * @returns ,total price
   */
  getTotal(items: cartItem[]): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }
}