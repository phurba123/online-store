import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { cartItem } from '../models/cart.model';
import { Product } from '../models/product.model';

const BASE_URL: string = 'https://fakestoreapi.com';

@Injectable({
  providedIn: 'root'
})

export class StoreService {

  constructor( private _http: HttpClient) { }

  /**
   * 
   * @param limit ,limit no of products fetched by providing value, default is 12
   * @param sort , sort items ,default is descending
   * @param category ,filter product by category, optional
   * @returns 
   */
  getAllProducts(limit = 12,sort = 'desc',category?: string): Observable<Product[]> {
    return this._http.get<Product[]>(`${BASE_URL}/products/${category? 'category/' + category: ''}?sort=${sort}&limit=${limit}`);
  }

  getAllCategories(): Observable<Array<string>> {
    return this._http.get<Array<string>>(
      `${BASE_URL}/products/categories`
    );
  }

  /**
   * Stripes service methods
   *
   */
   onCheckout(items: cartItem[]): Observable<any> {
    return this._http.post('http://localhost:4100/checkout',{ items})
  }
}
