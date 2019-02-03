// Nav component will be loaded for each child component
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
      menuName: 'category',
      menuRouter: '/category',
    },
  ]

  constructor() { }

  ngOnInit() {
  }

}
