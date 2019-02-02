import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCartDetailsComponent } from './my-cart-details/my-cart-details.component';
import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
// import { MyCartComponent } from './my-cart/my-cart.component';

@NgModule({
  imports: [
    CommonModule,
    ShoppingCartRoutingModule
  ],
  declarations: [MyCartDetailsComponent],
  // declarations: [MyCartComponent]
})
export class ShoppingCartModule { }
