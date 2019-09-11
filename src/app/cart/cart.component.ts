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
  id: string;
  constructor(private cartservice:CartService) { }

  ngOnInit() {
    this.cartservice.getCart()
    .subscribe(cart => {
      this.cart = cart;
      this.id = cart[0].medicalid;
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
      console.log("Deleted Medicine " + id);
    })
  }

  onBuy()
  {
    this.cartservice.postCartM(this.id,this.cart);
    this.cartservice.postCartU(this.cart);
    alert("Order Placed to Selected Medical Store");
  }

}
