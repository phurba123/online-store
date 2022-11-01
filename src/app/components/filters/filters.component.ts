import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit, OnDestroy {
  subscription!: Subscription;

  categories: string[] = [];

  @Output() categorySelectionEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor( private _storeService: StoreService) { }

  ngOnInit(): void {
    this._storeService.getAllCategories().subscribe((categories: any) =>{
      this.categories = categories;
    })
  }

  onCategorySelection(category: string): void {
    this.categorySelectionEvent.emit(category);
  }

  ngOnDestroy(): void {
   if ( this.subscription)
    this.subscription.unsubscribe();
  }
}
