import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd, RoutesRecognized } from '@angular/router';
import { ProductsModel,  imageBasepath} from 'src/app/models/products';
import { HttpService } from 'src/app/services/http/http.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { CartResponse } from 'src/app/models/shopping-cart';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


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
  inputQty: number = 1;
  cartProduct: CartResponse;
  closeResult: string;
  
  constructor(
    private activeRouter: ActivatedRoute,
    private httpService: HttpService,
    private shoppingCartService: ShoppingCartService,
    private modalService: NgbModal
  ) { 
  }

  ngOnInit() {
    /*subscript to watch the route para changes. 
    **************Please make changes inside this subscription. Don't delete it ***************/
    this.subscriptionActiveRouter$ = this.activeRouter.params.subscribe(params =>{
      this.id = +params['id']; // (+) converts string 'id' to a number

      this.httpGetEndPointService$ = this.httpService.GetJSON().subscribe(
        (res:ProductsModel[]) =>{
          this.product = res[this.id];
            this.product.image = `${imageBasepath}${this.product.image}`;
        },
        error => console.log("Error: ", error),
        () =>{
        });
        
    });
  }

  ngOnDestroy(): void {
    this.subscriptionActiveRouter$.unsubscribe();
    this.httpGetEndPointService$.unsubscribe();
  }

  increaQuantity(){
    this.inputQty ++;
  }

  decreaseQuantity(){
    // UX logic: the minimum amount of input box is 1. The end-user can't type anything lower than 1. 
    if(this.inputQty === 1){
      return;
    }
    this.inputQty --;
  }

  addItemToShoppingCart(content){
    this.cartProduct = {
      productId: this.id,//use index of JSON object as a id value. 
      quantity: Number(this.inputQty)
    }
    this.shoppingCartService.monitorShoppingCart(this.cartProduct);
    //Showing Popup message. 
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
