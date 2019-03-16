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
@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.css']
})
export class PrescriptionsComponent implements OnInit {

  id: string;
  doctor: string;
  location1: string;
  patient: string;
  description1: string;
  date: string;
  date_time: string;
  medicines: Medicines[];
  doctorname: string;
  medicine: string;
  med: Medpress[];
  patientname: string;
  quantity: number;
  appid: string;
  description: string;
  constructor(private doctorservice: DoctorService, private patientservice: PatientsService,
    private prescriptionservice: PrescriptionService,private route: ActivatedRoute,
    private location: Location,
    private bookingservice: BookingService,
    private medicineservice: MedicineService)
   { }

  ngOnInit() {

    this.medicineservice.getAllmedicines()
    .subscribe(medicines => {
      this.medicines = medicines;
    });
    this.route.params.pipe(switchMap((params: Params) => this.bookingservice.getAppointment(params['id'])))
    .subscribe(appointment => {
      this.patient = appointment.userid;
      this.date = appointment.date;
      this.patientname = appointment.user;
      this.doctor = appointment.docid;
      this.doctorname = appointment.doctor;
      this.id = appointment._id;
      this.appid = appointment._id;
      this.date_time = appointment.date_time;
      this.doctorservice.getDoctor(this.doctor)
      .subscribe(doctor => {
        this.location1 = doctor.location;
      });
      this.prescriptionservice.getAllMed(this.patient,this.id)
    .subscribe(medicines => {
      this.med = medicines;
      console.log(this.med);
    })
    });
  }
  onSave()
  {  
  this.prescriptionservice.postPrescription(this.patient,this.date,this.doctorname,this.location1,this.id,this.description1,this.doctor,this.patientname)
  } 
  onAdd()
  {
    this.prescriptionservice.postMed(this.medicine,this.quantity,this.patient,this.date,this.id,this.description);
  }
  deleteMed(id: string)
  {
    this.prescriptionservice.delMed(this.patient,id,this.id);
  }
}
