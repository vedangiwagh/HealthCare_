import { Component, OnInit } from '@angular/core';
import { Order } from '../shared/order';
import { CartService } from '../services/cart.service';
import { MedicalsService } from '../services/medicals.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-medicalcart',
  templateUrl: './medicalcart.component.html',
  styleUrls: ['./medicalcart.component.css']
})
export class MedicalcartComponent implements OnInit {

  userid: string;
  user: string;
  orders: Order[];
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
    this.medicalservice.getOrders()
    .subscribe(orders => {
      this.orders = orders;
      console.log(this.orders);
    })
  }

  delete(id: string,user: string)
  {
    this.cartservice.deleteorderM(this.userid,id);
    this.cartservice.deleteorderU(user,id);
  }

}
