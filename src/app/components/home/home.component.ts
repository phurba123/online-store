import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';

const ROW_HEIGHT: {[id: number]: number } ={
  1: 400,
  3: 335,
  4: 350
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  noOfCol: number = 3;
  rowHeight: number = ROW_HEIGHT[this.noOfCol];

  // keeps track of current category selection
  category: string | undefined;

  constructor(private _cartService: CartService) { }

  ngOnInit(): void {
  }

  colCountChange(num: number) {
    this.noOfCol = num;
    this.rowHeight = this.getRowHeight(this.noOfCol)
  }

  onNewCategorySelection(category: string): void {
    this.category = category;
    console.log('selected category is : ', this.category)
  }

  getRowHeight(noOfCol: number): number {
    return ROW_HEIGHT[noOfCol];
  }

  onAddingToCart(item: Product) {
    this._cartService.addToCart({
      product: item.image,
      name: item.title,
      price: item.price,
      quantity: 1,
      id: item.id,
    });
  }

}
