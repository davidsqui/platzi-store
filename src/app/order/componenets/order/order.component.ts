import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/core/services/cart.service';
import { Product } from './../../../core/models/product.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  products$: Observable<Product[]>;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.products$ = this.cartService.cart$
      .pipe(map(products => {

        const prods = products.map(product => {
          let count = 0;
          let totalOccurrences = 0;

          product.quantity = 1;
          products.forEach(pr => {
            if (pr.id === product.id) {
              count++;
            }
            totalOccurrences = count;
          });

          if (totalOccurrences > 1) {
            product.quantity = totalOccurrences;
          }

          return product;
        });


        const productsDif = Array.from(new Set(prods.map(product => product.id)))
          .map(id => prods.find(product => product.id === id));

        return productsDif as Product[];

      }));
  }


}
