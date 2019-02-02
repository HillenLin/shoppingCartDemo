import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { CartResponse } from 'src/app/models/shopping-cart';
import { HttpService } from '../../services/http/http.service';
import { ProductsModel } from '../../models/products';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-cart-details',
  templateUrl: './my-cart-details.component.html',
  styleUrls: ['./my-cart-details.component.scss']
})

export class MyCartDetailsComponent implements OnInit {
  activeShoppingCart: CartResponse[] = [];
  endPoint: ProductsModel[];
  httpGetEndPointService$:Subscription;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private httpService: HttpService,
  ) { }
  
  ngOnInit() {
    // receive all the info from the shopping cart 
    this.activeShoppingCart = this.shoppingCartService.activeShoppingCart;

    //receive all the info from the products.json
    this.httpService.GetJSON().subscribe((res:ProductsModel[]) =>{
      this.endPoint = res;
    },
    (error: any) => { console.error(error) },
    () =>{
      //codes should be executed after the completion of the API call
    });
  }

  // ngOnDestroy(): void {
  //   this.httpGetEndPointService$.unsubscribe();
  // }
}