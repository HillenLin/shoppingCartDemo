import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyCartDetailsComponent } from './my-cart-details/my-cart-details.component';


const routes: Routes = [
  {
    path: '',
    component: MyCartDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingCartRoutingModule { }
