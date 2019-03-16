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
  time: number;
  start_time: number = 0;
  end_time: number = 0;
  timings: number[] = [];
  doctorIds : string[];
  prev : string;
  next : string;
  errMess : string;
  dt: string;
  appointment = false;
  validator = false;
  constructor(private route: ActivatedRoute,
    private location: Location,
    private doctorservice : DoctorService,
    private bookingservice : BookingService) { }

  ngOnInit() {
    this.doctorservice.getDoctorIds().subscribe(doctorIds => this.doctorIds = doctorIds);
    this.route.params.pipe(switchMap((params: Params) => this.doctorservice.getDoctor(params['id'])))
    .subscribe(doctor => { this.doctor = doctor; this.setPrevNext(doctor._id); this.start_time = doctor.start_time; 
      this.end_time = doctor.end_time;
      this.timings.push(this.start_time);
      while(this.start_time < this.end_time)
    {
      if(this.start_time % 100 == 0)
      {
        this.start_time = this.start_time + 30;
      } 
      else
      {
        this.start_time = this.start_time + 70;
      }
      this.timings.push(this.start_time);
    };
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
    this.bookingservice.isAppointment(this.doctor._id)
      .then(value => {
        this.appointment = value;
        if (!this.appointment)
        {
          this.dt = this.date + this.time.toString();
          this.bookingservice.checkDatetime(this.doctor._id, this.dt)
          .then(value => {
            this.validator = value;
            if(!this.validator)
            {
              this.time = +this.time;
              this.bookingservice.postAppointment(this.doctor.name,this.doctor._id,this.date,this.time, this.dt)
              .then(appointments => { console.log(appointments);this.appointment = true;})
              .catch(err => console.log('Error ', err));
            }
          });
        }  
      });
  }
}