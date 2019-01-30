import { Injectable } from '@angular/core';
import { CartResponse } from '../models/shopping-cart';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  shoppingCartArr: CartResponse;

  private shoppingCartSubject = new BehaviorSubject<CartResponse>(this.shoppingCartArr);
  currentShoppingCarts = this.shoppingCartSubject.asObservable();

  constructor() { }

  monitorShoppingCart(shoppingcartArr: CartResponse):void {
    this.shoppingCartSubject.next(shoppingcartArr);
  }

}
