import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyCartDetailsComponent } from './my-cart-details/my-cart-details.component';
import { ProductDetailComponent } from '../product/product-detail/product-detail.component';


const routes: Routes = [
  {
    path: '',
    component: MyCartDetailsComponent,
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingCartRoutingModule { }
