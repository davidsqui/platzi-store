import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/core/services/products/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {

  form: FormGroup;


  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
  ) {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.fb.group({
      id: ['', [Validators.required]],
      title: ['', [Validators.required]],
      price: ['', [Validators.required]],
      image: [''],
      description: ['', [Validators.required]],
    });
  }

  saveProduct(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const product = this.form.value;
      this.productService.createProduct(product).subscribe(resproduct => {
        this.router.navigate(['/admin/products']);
      });
    }

  }
}
