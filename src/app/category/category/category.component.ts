import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http/http.service';
import { Subscription } from 'rxjs';
import { ProductsModel, imageBasepath } from '../../models/products';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  httpGetEndPointService$: Subscription;
  endPoint: ProductsModel[];
  imageBasepath: string = './assets/images/'
  

  constructor(
    private httpService: HttpService,
  ) { }

  ngOnInit():void {
    //receiving the endpoint data returned from API(Local JSON file)
    this.httpGetEndPointService$ = this.httpService.GetJSON().subscribe((res:ProductsModel[]) =>{
      this.endPoint = res;

      //contact string to makeup URL path
      for(let i = 0; i < this.endPoint.length; i ++){
        let element = this.endPoint[i]
        element.image = `${imageBasepath}${element.image}`;
        element.id = i;
      }
    },
    (error: any) => { console.error(error) },
    () =>{
      //codes should be executed after the completion of the API call
    });

  }

  ngOnDestroy(): void {
    this.httpGetEndPointService$.unsubscribe();
  }

}
