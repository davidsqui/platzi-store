import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ProductService } from 'src/app/core/services/products/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {

  form: FormGroup;
  image$: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private storageService: AngularFireStorage,
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

  uploadFile(event: any) {
    const file = event.target.files[0];
    const name = 'image';
    const fileRef = this.storageService.ref(`images/${name}`);
    const task = this.storageService.upload(`images/${name}`, file);

    task.snapshotChanges()
      .pipe(
        finalize(() => {
          this.image$ = fileRef.getDownloadURL();
          this.image$.subscribe(url => {
            this.form.get('image')?.setValue(url);
            console.log(url);
          });
        })
      ).subscribe();
  }
}
