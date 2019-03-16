import { Component, OnInit } from '@angular/core';
import { Cart } from '../shared/cart';
import { CartService } from '../services/cart.service';
import { MedicalsService } from '../services/medicals.service';
@Component({
  selector: 'app-medicalcart',
  templateUrl: './medicalcart.component.html',
  styleUrls: ['./medicalcart.component.css']
})
export class MedicalcartComponent implements OnInit {

  orders: Cart[];
  constructor(private cartservice: CartService,
    private medicalservice: MedicalsService) { }

  ngOnInit() {
    this.medicalservice.getOrders()
    .subscribe(orders => {
      this.orders = orders;
      console.log(this.orders);
    })
  }

}
