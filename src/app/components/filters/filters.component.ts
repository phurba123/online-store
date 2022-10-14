import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  categories: string[] = [ 'Shirts','Sweatshirts', 'Shoes'];

  @Output() categorySelectionEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onCategorySelection(category: string): void {
    this.categorySelectionEvent.emit(category);
  }

}
