import { Component, OnInit, Inject } from '@angular/core';
import { Doctor } from '../shared/doctor';
import { DoctorService} from '../services/doctor.service';
import { from } from 'rxjs';
@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {

  doctors: Doctor[];
  errMess: string;

  selectedDoctor: Doctor;
  constructor(private doctorservice : DoctorService) { }

  ngOnInit() {
    this.doctorservice.getDoctors()
    .subscribe(doctors => this.doctors = doctors,
      errmess => this.errMess = <any>errmess);
  }
  onSelect(doctor: Doctor) {
    this.selectedDoctor = doctor;
  }

}
