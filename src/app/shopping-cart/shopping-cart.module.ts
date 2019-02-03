import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCartDetailsComponent } from './my-cart-details/my-cart-details.component';
import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductModule } from '../product/product.module';

@NgModule({
  imports: [
    CommonModule,
    ShoppingCartRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ProductModule,
  ],
  declarations: [MyCartDetailsComponent],
  // declarations: [MyCartComponent]
})
export class ShoppingCartModule { }
