import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { CartResponse } from 'src/app/models/shopping-cart';
import { HttpService } from '../../services/http/http.service';
import { ProductsModel, imageBasepath } from '../../models/products';
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
  title="Shopping Cart";
  currentQuantity: number;
  cartProduct: CartResponse;
  totalPrice: number = 0;
  inputQty:number;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private httpService: HttpService,
  ) { }
  
  ngOnInit() {
    // receive all the info from the shopping cart 
    this.activeShoppingCart = this.shoppingCartService.activeShoppingCart;

    //receive all the info from the products.json
    this.httpGetEndPointService$ = this.httpService.GetJSON().subscribe((res:ProductsModel[]) =>{
      this.endPoint = res;
    },
    (error: any) => { console.error(error) },
    () =>{
      //codes should be executed after the completion of the API call
      for(let i = 0; i < this.endPoint.length; i ++){
        let element = this.endPoint[i]
        element.image = `${imageBasepath}${element.image}`;
        element.id = i;
      }

      //Calculate the total price 
      this.activeShoppingCart.forEach(element => {
        let elePrice = this.endPoint[element.productId].price;
        let eleQuantity = element.quantity;
        this.totalPrice += elePrice * eleQuantity;
      });
    });
  }

  increaseQuantity(productId:number){

    this.cartProduct = {
      productId: productId,//use index of JSON object as a id value. 
      quantity: 1
    }
    this.shoppingCartService.monitorShoppingCart(this.cartProduct);

  }

  decreaseQuantity(productId:number){

    this.cartProduct = {
      productId: productId,//use index of JSON object as a id value. 
      quantity: -1
    }
    this.shoppingCartService.monitorShoppingCart(this.cartProduct);
  }
  ngOnDestroy(): void {
    this.httpGetEndPointService$.unsubscribe();
  }

  deleteItem(productId:number, quantity:number){

    this.cartProduct = {
      productId: productId,
      quantity: - (quantity),
    }
    this.shoppingCartService.monitorShoppingCart(this.cartProduct);

  }

  updateShoppingCart(productId:number, event){
    console.log('value change');
    this.cartProduct = {
      productId: productId,//use index of JSON object as a id value. 
      quantity: Number(event.target.value),
      action: "reset"
    }
    this.shoppingCartService.monitorShoppingCart(this.cartProduct);
  }

}