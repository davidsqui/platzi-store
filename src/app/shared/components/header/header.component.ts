import { map } from 'rxjs/operators';
import { CartService } from 'src/app/core/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  total$: Observable<number>;

  constructor(
    private cartService: CartService
  ) {
    this.total$ = this.cartService.cart$.pipe(map(products => {
      return products.length;
      /*if (products.length === 0) {
        return this.cartService.getProductsLocalStorage().length;
      } else {
        return products.length;
      }*/
    }
    ));
  }

  ngOnInit(): void {
  }

}
