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

      // Check if it is a new product and push it to the shopping cart array
      if(res && !this.activeShoppingCart.filter(cart => cart.productId == res.productId).length){
        this.activeShoppingCart.push(res);
      }
      //Check if it is a existing product and change its quantity
      else if(res && this.activeShoppingCart.filter(cart => cart.productId == res.productId).length){
        // find the same product by id
        if(res.action == "reset"){
          this.activeShoppingCart.filter(cart => cart.productId == res.productId)[0].quantity = res.quantity;
        }else{
          this.activeShoppingCart.filter(cart => cart.productId == res.productId)[0].quantity += res.quantity;
        }
      }

      //Check if its quantity equals to 0 and remove it from the array
      if(this.activeShoppingCart.filter(cart => cart.quantity <= 0).length){
        for (let i = 0; i < this.activeShoppingCart.length; i++) {
          if(this.activeShoppingCart[i].quantity === 0){
            let index = i;
            this.activeShoppingCart.splice(index, 1);
          }
        }   
      }
    });
    return this.activeShoppingCart;
  }
  removeItemFromShoppingCart(){
    //get the productId
  }
}
