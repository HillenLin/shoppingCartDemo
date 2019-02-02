import { Injectable } from '@angular/core';
import { CartResponse } from '../models/shopping-cart';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  activeShoppingCart: CartResponse[] = [];
  shoppingCartArr: CartResponse;

  private shoppingCartSubject = new BehaviorSubject<CartResponse>(this.shoppingCartArr);
  currentShoppingCarts = this.shoppingCartSubject.asObservable();

  constructor() { }

  monitorShoppingCart(shoppingcartArr: CartResponse):void {
    this.shoppingCartSubject.next(shoppingcartArr);
  }

  getShoppingCart(): CartResponse[] {
    this.currentShoppingCarts.subscribe((res: CartResponse) => {
      console.log(res);
      if(res && !this.activeShoppingCart.filter(cart => cart.productId == res.productId).length){
        this.activeShoppingCart.push(res);
        console.log('new element');
      }else if(res && this.activeShoppingCart.filter(cart => cart.productId == res.productId).length){
        console.log('old element');
        // this.activeShoppingCart.forEach(element => {
        //   if(element.productId == res.productId){
        //     element.quantity += res.quantity;
        //   }
        // });

        // find the same product by id
        console.log("loop");
        this.activeShoppingCart.filter(cart => cart.productId == res.productId)[0].quantity += res.quantity;
      }

    });
    console.log(this.activeShoppingCart);
    return this.activeShoppingCart;
  }
}
