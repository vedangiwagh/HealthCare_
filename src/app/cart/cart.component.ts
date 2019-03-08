import { Component, OnInit, Inject } from '@angular/core';
import { Cart } from '../shared/cart';
import { CartService } from '../services/cart.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: Cart[];
  total: number = 0;
  constructor(private cartservice:CartService) { }

  ngOnInit() {
    this.cartservice.getCart()
    .subscribe(cart => {
      this.cart = cart;
      cart.forEach(cart => {
        this.total = this.total + cart.price;
      })
    });
  }

  deleteMedicine(id : string,price: number)
  {
    this.cartservice.deleteMedicine(id)
    .then(() => {
      this.total = 0;
      this.cartservice.getCart()
    .subscribe(cart => {
      cart.forEach(cart => {
        this.total = this.total + cart.price;
      })
    });
      console.log("Deleted Medicine ")
    })
  }

}
