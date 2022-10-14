import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'product-header',
  templateUrl: './product-header.component.html',
  styleUrls: ['./product-header.component.css']
})
export class ProductHeaderComponent implements OnInit {

  sort:string = 'desc';
  itemsCount: number = 12;

  @Output() colCountChange: EventEmitter<number> = new EventEmitter<number>;

  constructor() { }

  ngOnInit(): void {
  }

  onSortUpdate(updateSort: string) : void {
    this.sort = updateSort;
  }

  itemsCountUpdate(newCount: number): void {
    this.itemsCount = newCount;
  }

  onColumnUpdate(colNum: number): void {
    this.colCountChange.emit(colNum);
  }
}
