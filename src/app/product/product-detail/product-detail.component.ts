import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd, RoutesRecognized } from '@angular/router';
import { ProductsModel,  imageBasepath} from 'src/app/models/products';
import { HttpService } from 'src/app/services/http/http.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { CartResponse } from 'src/app/models/shopping-cart';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  subscriptionActiveRouter$: Subscription;
  id: number;
  httpGetEndPointService$: Subscription;
  product: ProductsModel;
  inputQty: number;
  cartProduct: CartResponse;
  constructor(
    private activeRouter: ActivatedRoute,
    private httpService: HttpService,
    private shoppingCartService: ShoppingCartService
  ) { 
  }

  ngOnInit() {
    /*subscript to watch the route para changes. 
    **************Please make changes inside this subscription. Don't delete it ***************/
    this.subscriptionActiveRouter$ = this.activeRouter.params.subscribe(params =>{
      console.log(params);
      this.id = +params['id']; // (+) converts string 'id' to a number
      console.log(this.id);

      this.httpGetEndPointService$ = this.httpService.GetJSON().subscribe(
        (res:ProductsModel[]) =>{
          this.product = res[this.id];
            this.product.image = `${imageBasepath}${this.product.image}`;
        },
        error => console.log("Error: ", error),
        () =>{
          console.log(this.product);
        });
        
    });
  }

  ngOnDestroy(): void {
    this.subscriptionActiveRouter$.unsubscribe();
    this.httpGetEndPointService$.unsubscribe();
  }

  addItemToShoppingCart(){
    console.log(this.id);
    console.log(this.inputQty);
    this.cartProduct = {
      productId: this.id,
      quantity: this.inputQty
    }
    this.shoppingCartService.monitorShoppingCart(this.cartProduct);
  }

}
