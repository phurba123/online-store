import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { Subject, takeUntil } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

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
export class HomeComponent implements OnInit, OnDestroy {

  noOfCol: number = 3;
  rowHeight: number = ROW_HEIGHT[this.noOfCol];

  // keeps track of current category selection
  category: string | undefined;
  sort: string = 'desc';
  count = 12;
  products!:Product[];

  $destroy:Subject<boolean> = new Subject();

  constructor(private _cartService: CartService, private _storeService: StoreService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  colCountChange(num: number) {
    this.noOfCol = num;
    this.rowHeight = this.getRowHeight(this.noOfCol)
  }

  onNewCategorySelection(category: string): void {
    this.category = category;
    this.getAllProducts();
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

  getAllProducts(category?: string): void {
    this._storeService.getAllProducts(this.count, this.sort, this.category).pipe(takeUntil(this.$destroy)).subscribe((products) =>{
      this.products = products;
    });
  }

  onItemsCountChange(newCount: number): void {
    this.count = newCount;
    this.getAllProducts();
  }

  onSortChange(newSort: string): void {
    this.sort = newSort;
    this.getAllProducts()
  }

  ngOnDestroy(): void {
    this.$destroy.next(true);
    this.$destroy.complete();
  }

}
