import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { CartService } from '../services/cart.service';
import { Cart } from '../shared/cart';
import { TouchSequence } from 'selenium-webdriver';
@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.css']
})
export class OrderdetailComponent implements OnInit {

  cart: Cart[];
  constructor(private route: ActivatedRoute,
    private location: Location,
    private cartservice: CartService) { }

  ngOnInit() {
    this.route.params.pipe(switchMap((params: Params) => this.cartservice.getOrders(params['id'])))
    .subscribe(orders => {
      console.log(orders);
      this.cart = orders;
      console.log(this.cart);
    })
  }

}
