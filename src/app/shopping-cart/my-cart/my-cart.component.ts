import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { CartResponse } from 'src/app/models/shopping-cart';
import { HttpService } from '../../services/http/http.service';
import { ProductsModel } from '../../models/products';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss']
})
export class MyCartComponent implements OnInit {
  activeShoppingCart: CartResponse[] = [];
  endPoint: ProductsModel[];
  constructor(
    private shoppingCartService: ShoppingCartService,
  ) { }

  ngOnInit() {
    this.activeShoppingCart = this.shoppingCartService.getShoppingCart();
  }

}
