import { Component, OnInit } from '@angular/core';
import { IMenu } from 'src/app/models/Imenu';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  MENULIST: IMenu[] = [
    {
      menuName: 'home',
      menuRouter: '/home',
    },
    {
      menuName: 'Shopping Cart',
      menuRouter: '/shopping-cart',
    },
  ]

  constructor() { }

  ngOnInit() {
  }

}
