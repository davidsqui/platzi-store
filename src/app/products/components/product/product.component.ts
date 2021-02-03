import { CartService } from 'src/app/core/services/cart.service';
import { Product } from './../../../core/models/product.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {


  @Input() product: Product;
  @Output() productClicked: EventEmitter<any> = new EventEmitter();

  today = new Date();

  constructor(
    private cartService: CartService,
  ) {
    console.log('1. constructor');
  }

  ngOnInit(): void {
    console.log('3. ngOnInit');
  }

  addCart() {
    // this.productClicked.emit(this.product.id);
    this.cartService.addCart(this.product);
    
  }

}
