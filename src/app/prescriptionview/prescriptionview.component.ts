import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../services/doctor.service';
import { PatientsService } from '../services/patients.service';
import { PrescriptionService } from '../services/prescription.service';
import { BookingService } from '../services/booking.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { Medpress } from '../shared/medpres';
import { MedicineService } from '../services/medicine.service';
import { Medicines } from '../shared/medicines';
import { Prescription } from '../shared/prescription';
@Component({
  selector: 'app-prescriptionview',
  templateUrl: './prescriptionview.component.html',
  styleUrls: ['./prescriptionview.component.css']
})
export class PrescriptionviewComponent implements OnInit {
 
  prescription: Prescription[];
  constructor(private doctorservice: DoctorService, private patientservice: PatientsService,
    private prescriptionservice: PrescriptionService,private route: ActivatedRoute,
    private location: Location,
    private bookingservice: BookingService,
    private medicineservice: MedicineService) { }

  ngOnInit() {
    this.prescriptionservice.getAllPRescription()
    .subscribe(prescriptions => {
      this.prescription = prescriptions;
    })
  }


}
