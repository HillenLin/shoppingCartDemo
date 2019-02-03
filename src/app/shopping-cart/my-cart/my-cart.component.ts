import { Component, OnInit, ElementRef } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { CartResponse } from 'src/app/models/shopping-cart';
import { HttpService } from '../../services/http/http.service';
import { ProductsModel, imageBasepath } from '../../models/products';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss'],
})
export class MyCartComponent implements OnInit {
  activeShoppingCart: CartResponse[] = [];
  endPoint: ProductsModel[];
  isPopupAvailable: boolean = false;
  isClickOutside: boolean = false;
  httpGetEndPointService$:Subscription;
  totalPrice: number = 0;
  cartProduct: CartResponse;


  constructor(
    private shoppingCartService: ShoppingCartService,
    private httpService: HttpService,
    private _eref: ElementRef
  ) { }

  ngOnInit() {
    this.activeShoppingCart = this.shoppingCartService.getShoppingCart();

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

        let currentShoppingCart = this.shoppingCartService.currentShoppingCarts;

        //Calculate the total price 
        if(currentShoppingCart){
          currentShoppingCart.forEach(element => {
            if(element){
              let elePrice = this.endPoint[element.productId].price;
              let eleQuantity = element.quantity;
              this.totalPrice += elePrice * eleQuantity;
            }
          });
        }
      });
    }

  showShoppingCartPopup(){
    //todo
    if(this.isPopupAvailable){
      this.isPopupAvailable = false
    }else{
      this.isPopupAvailable = true
    }
  }

  deleteItem(productId:number, quantity:number){

    this.cartProduct = {
      productId: productId,
      quantity: - (quantity),
    }
    this.shoppingCartService.monitorShoppingCart(this.cartProduct);

  }

  onClickedOutside(e: Event) {
    this.isPopupAvailable = false;
  }

}
