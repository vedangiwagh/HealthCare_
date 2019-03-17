import { Component, OnInit } from '@angular/core';
import { Order } from '../shared/order';
import { CartService } from '../services/cart.service';
import { MedicalsService } from '../services/medicals.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-userorders',
  templateUrl: './userorders.component.html',
  styleUrls: ['./userorders.component.css']
})
export class UserordersComponent implements OnInit {

  orders: Order[];
  userid: string;
  constructor(private cartservice: CartService,
    private medicalservice: MedicalsService,
    private authService: AuthService) { }

  ngOnInit() {
    this.authService.getAuthState()
        .subscribe((user) => {
        if (user) {
          this.userid = user.uid;
          // User is signed in.
          }
      });
    this.medicalservice.getUserOrder()
    .subscribe(orders => {
      this.orders = orders;
      console.log(this.orders);
    })
  }
  delete(id:string,user: string)
  {
    this.cartservice.deleteorderU(user,id);
  }

}
