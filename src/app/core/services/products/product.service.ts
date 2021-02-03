import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../../../product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = `${environment.url}/products`;

  constructor(
    private http: HttpClient
  ) { }

  getProducts() {
    return this.http.get<Product[]>(this.url);
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.url}/${id}`);
  }

  createProduct(product: Product) {
    return this.http.post(this.url, product);
  }

  updateProduct(id: string, changes: Partial<Product>) {
    return this.http.put(`${this.url}/${id}`, changes);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
