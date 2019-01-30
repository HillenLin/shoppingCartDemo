import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { CartResponse } from 'src/app/models/shopping-cart';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss']
})
export class MyCartComponent implements OnInit {
activeShoppingCart: CartResponse[] = [];
  constructor(
    private shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit() {

    

    this.shoppingCartService.currentShoppingCarts.subscribe((res: CartResponse) => {
      console.info(res);
      if(res && !this.activeShoppingCart.filter(cart => cart.productId == res.productId).length){
        this.activeShoppingCart.push(res);
      }else{
        this.activeShoppingCart.forEach(element => {
          if(element.productId == res.productId){
            element.quantity += res.quantity;
          }
        });
      }
      console.log(this.activeShoppingCart);
    });
  }

}
