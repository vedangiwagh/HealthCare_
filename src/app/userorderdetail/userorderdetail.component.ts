import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { CartService } from '../services/cart.service';
import { Cart } from '../shared/cart';
@Component({
  selector: 'app-userorderdetail',
  templateUrl: './userorderdetail.component.html',
  styleUrls: ['./userorderdetail.component.css']
})
export class UserorderdetailComponent implements OnInit {

  cart: Cart[];
  id:string;
  constructor(private route: ActivatedRoute,
    private location: Location,
    private cartservice: CartService) { }

  ngOnInit() {
    this.route.params.pipe(switchMap((params: Params) => this.cartservice.getUserOrders(params['id'])))
    .subscribe(orders => {
      this.cart = orders.cart;
    })
  }

}
