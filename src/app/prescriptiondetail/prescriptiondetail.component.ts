import { Component, OnInit } from '@angular/core';
import { PrescriptionService } from '../services/prescription.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { Prescription } from '../shared/prescription';
@Component({
  selector: 'app-prescriptiondetail',
  templateUrl: './prescriptiondetail.component.html',
  styleUrls: ['./prescriptiondetail.component.css']
})
export class PrescriptiondetailComponent implements OnInit {

  prescription: Prescription;
  constructor(private prescriptionservice: PrescriptionService,private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.route.params.pipe(switchMap((params: Params) => this.prescriptionservice.getPrescription(params['id'])))
    .subscribe(prescription => {
      this.prescription = prescription;
    })
  }

}
