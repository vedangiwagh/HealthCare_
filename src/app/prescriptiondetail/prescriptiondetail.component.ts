import { Component, OnInit } from '@angular/core';
import { PrescriptionService } from '../services/prescription.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { Prescription } from '../shared/prescription';
import { Medpress } from '../shared/medpres';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-prescriptiondetail',
  templateUrl: './prescriptiondetail.component.html',
  styleUrls: ['./prescriptiondetail.component.css']
})
export class PrescriptiondetailComponent implements OnInit {

  userid:string;
  prescription: Prescription;
  constructor(private prescriptionservice: PrescriptionService,private route: ActivatedRoute,
    private location: Location,
    private authService: AuthService) { }

  ngOnInit() {
    this.authService.getAuthState()
        .subscribe((user) => {
        if (user) {
          // User is signed in.
          this.userid = user.uid;
        } else {
          console.log('Wrong Password or Username');
        }
      });
    this.route.params.pipe(switchMap((params: Params) => this.prescriptionservice.getPrescription(params['id'])))
    .subscribe(prescription => {
      this.prescription = prescription;
      this.route.params.pipe(switchMap((params: Params) => 
      this.prescriptionservice.getAllMed(this.userid,params['id'])))
      .subscribe(medicines => {
        this.prescription.medicines = medicines;
        console.log(this.prescription.medicines);
      })
    });
  }

}
