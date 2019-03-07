import { Component, OnInit } from '@angular/core';
import { Booking, BookingDoc } from '../shared/booking';
import { BookingService } from '../services/booking.service';
import { DoctorService } from '../services/doctor.service';
@Component({
  selector: 'app-doctorsview',
  templateUrl: './doctorsview.component.html',
  styleUrls: ['./doctorsview.component.css']
})
export class DoctorsviewComponent implements OnInit {

  appointments : Booking[];
  errMess: string;
  constructor(private bookingservice : BookingService,
    private doctorservice : DoctorService) { }

  ngOnInit() {
    this.bookingservice.getDoctorAppointments()
      .subscribe(appointments => {
        this.appointments = appointments;
      },
      errmess => this.errMess = <any>errmess);
  }

  cancelAppointment(id: string) {
    this.bookingservice.deleteAppointment(id)
    .then(() => {
      console.log("Deleted appointment");
    });
  }

}
