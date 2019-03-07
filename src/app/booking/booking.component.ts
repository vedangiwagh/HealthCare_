import { Component, OnInit, Inject } from '@angular/core';
import { Booking, BookingDoc } from '../shared/booking';
import { BookingService } from '../services/booking.service';
import { DoctorService } from '../services/doctor.service';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  appointments : Booking[];
  bookappointment: BookingDoc[];
  errMess: string;
  favorite: BookingDoc;
  constructor(private bookingservice : BookingService,
    private doctorservice : DoctorService) { }

  ngOnInit() {
    this.bookingservice.getAppointments()
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
