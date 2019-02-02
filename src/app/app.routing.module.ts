import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const appRoutes: Routes = [
  {
    path: 'category',
    loadChildren: './category/category.module#CategoryModule'
  },
  {
    path: 'shopping-cart',
    loadChildren: './shopping-cart/shopping-cart.module#ShoppingCartModule'
  },
  {
    path: '',
    redirectTo: '/category',
    pathMatch: 'full'  
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }