import { Component, OnInit, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { Medical } from '../shared/medical';
import { Medicine } from '../shared/medicine';
import { CartService } from '../services/cart.service';
import { MedicalsService } from '../services/medicals.service';
@Component({
  selector: 'app-medicaldetail',
  templateUrl: './medicaldetail.component.html',
  styleUrls: ['./medicaldetail.component.css']
})
export class MedicaldetailComponent implements OnInit {

  errMess: string;
  medical: Medical;
  medical1: Medical;
  price: number = 0;
  med: Medicine;
  selectedMedicine: string;
  quantity: number = 0;
  // quantities: number[] = [];
  constructor(private medicalsservice : MedicalsService,
    private route: ActivatedRoute,
    private location: Location,
    private cartservice: CartService) { }

  ngOnInit() {
    this.route.params.pipe(switchMap((params: Params) => this.medicalsservice.getMedical(params['id'])))
    .subscribe(medical => { 
      this.medical = medical;
      this.medicalsservice.getMedicines(this.medical._id)
      .subscribe(medicines => {
        this.medical.medicines = medicines});
        
    }); 
  }

  addtoCart(){
    this.cartservice.isMedicine(this.selectedMedicine)
      .then(value => {
        console.log(value);
        if(!value)
        {
          this.route.params.pipe(switchMap((params: Params) => this.medicalsservice.getMedical(params['id'])))
          .subscribe(medical => { 
            this.medical1 = medical;
            this.medicalsservice.getMedicine(this.medical1._id, this.selectedMedicine)
            .subscribe(medicines => {
              this.med = medicines;
              this.price = this.med[0].price*this.quantity;   
              this.cartservice.postCart(this.selectedMedicine,this.price,this.quantity);   
            });
          });   
        }
        else
        {
          alert("Medicine already exists in cart");
        }
      });
  }
}
