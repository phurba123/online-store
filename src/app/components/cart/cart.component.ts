import { Component, OnInit } from '@angular/core';
import { cart, cartItem } from 'src/app/models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: cart = {
    items:[
      {
        id: 1,
        name: 'snickers',
        price: 130,
        quantity: 1,
        product: 'https://via.placeholder.com/150'
      },
      {
        id: 2,
        name: 'jacket',
        price: 230,
        quantity: 3,
        product: 'https://via.placeholder.com/150'
      }
    ]
  }

  cartDataSource: cartItem[] = [];
  displayedCol: string[] = ['product', 'name', 'price', 'quantity', 'total', 'action'];
  totalPrice: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.cartDataSource = this.cart.items;
    console.log('nog on init cart');

    this.getTotalPriceOfCartItemes(this.cart.items);
  }

  getTotalPriceOfCartItemes(items: cartItem[]): void {
    this.totalPrice = 0;
    items.forEach((item: cartItem) => {
      if(item.price) {
        this.totalPrice = this.totalPrice + (item.price * (item.quantity | 1));
      }
    });

    console.log('new total price is : ', this.totalPrice)
  }

  decreaseQuantity(id: number): void {
    this.cart.items.forEach((item: cartItem) => {
      if (item.id === id) {
        if(item.quantity > 1) {
          item.quantity--;
        }
      }
    });
    this.getTotalPriceOfCartItemes(this.cart.items)
  }

  increaseQuantity(id: number): void {
    this.cart.items.forEach((item: cartItem) => {
      if(item.id === id) {
        item.quantity++;
      }
    });

    this.getTotalPriceOfCartItemes(this.cart.items);
  }

}
