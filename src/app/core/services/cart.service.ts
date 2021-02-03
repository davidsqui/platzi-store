import { Product } from './../models/product.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private products: Product[] = [];
  private cart = new BehaviorSubject<Product[]>([]);

  cart$ = this.cart.asObservable();

  constructor() { }

  addCart(product: Product) {
    this.products = this.getProductsLocalStorage();
    this.products = [...this.products, product];

    localStorage.setItem('products', JSON.stringify(this.products));

    this.cart.next(this.products);
  }

  getProductsLocalStorage(): Product[] {
    let products = localStorage.getItem('products');
    return products = products ? JSON.parse(products) : [];
  }
}
