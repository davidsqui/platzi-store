import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductsRoutingModule } from './products-routing.module';


@NgModule({
    declarations: [
        ProductsComponent,
        ProductComponent,
        ProductDetailComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        ProductsRoutingModule,
        MaterialModule,
    ]
})
export class ProductsModule { }
