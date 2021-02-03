import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/products/product.service';
import { Product } from 'src/app/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  displayedColumns: string[] = ['id', 'title', 'price', 'actions'];

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe(res => {
      console.log(res);
    });
  }

}
