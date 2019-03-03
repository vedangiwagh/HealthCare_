import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { Doctor } from '../shared/doctor';
import { DoctorService } from '../services/doctor.service';
import { from } from 'rxjs';
@Component({
  selector: 'app-doctordetail',
  templateUrl: './doctordetail.component.html',
  styleUrls: ['./doctordetail.component.css']
})
export class DoctordetailComponent implements OnInit {
  doctor: Doctor;
  doctorIds : string[];
  prev : string;
  next : string;
  errMess : string;
  constructor(private route: ActivatedRoute,
    private location: Location,
    private doctorservice : DoctorService) { }

  ngOnInit() {
    this.doctorservice.getDoctorIds().subscribe(doctorIds => this.doctorIds = doctorIds);
    this.route.params.pipe(switchMap((params: Params) => this.doctorservice.getDoctor(params['id'])))
    .subscribe(doctor => { this.doctor = doctor; this.setPrevNext(doctor._id); },
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

}
