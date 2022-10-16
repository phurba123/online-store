import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product!: Product;
  @Output() addToCart = new EventEmitter();

  @Input() fullWidthMode: boolean = false;
  constructor(private _cartService: CartService) { }

  ngOnInit(): void {
    this.product = {
      id:  1,
      title: 'title',
      category: 'Shoes',
      price: 150,
      description: 'description about this product',
      image: 'https://via.placeholder.com/150'
    }
    console.log('product item ngoninit')
  }

  onAddToCart() {
    this.addToCart.emit(this.product);
  }

}
