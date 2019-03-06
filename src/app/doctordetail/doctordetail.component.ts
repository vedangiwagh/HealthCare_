import { Component, OnInit, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { Doctor } from '../shared/doctor';
import { DoctorService } from '../services/doctor.service';
import { BookingService } from '../services/booking.service';
import { from } from 'rxjs';
@Component({
  selector: 'app-doctordetail',
  templateUrl: './doctordetail.component.html',
  styleUrls: ['./doctordetail.component.css']
})
export class DoctordetailComponent implements OnInit {
  doctor: Doctor;
  date: string;
  time: string;
  doctorIds : string[];
  prev : string;
  next : string;
  errMess : string;
  appointment = false;
  constructor(private route: ActivatedRoute,
    private location: Location,
    private doctorservice : DoctorService,
    private bookingservice : BookingService) { }

  ngOnInit() {
    this.doctorservice.getDoctorIds().subscribe(doctorIds => this.doctorIds = doctorIds);
    this.route.params.pipe(switchMap((params: Params) => this.doctorservice.getDoctor(params['id'])))
    .subscribe(doctor => { this.doctor = doctor; this.setPrevNext(doctor._id);
      this.bookingservice.isAppointment(this.doctor._id)
      .then(value => {
        this.appointment = value;
      });
    },
    errmess => this.errMess = <any>errmess);  
  }

  setPrevNext(doctorId: string) {
    const index = this.doctorIds.indexOf(doctorId);
    this.prev = this.doctorIds[(this.doctorIds.length + index - 1) % this.doctorIds.length];
    this.next = this.doctorIds[(this.doctorIds.length + index + 1) % this.doctorIds.length];
  }
  goBack(): void {
    this.location.back();
  }

  bookAppointment() {
    if (!this.appointment)
      this.bookingservice.postAppointment(this.doctor._id,this.date)
        .then(appointments => { console.log(appointments); this.appointment = true})
        .catch(err => console.log('Error ', err));
  }
}
