import { Component, OnInit } from '@angular/core';
import { Booking, BookingDoc } from '../shared/booking';
import { BookingService } from '../services/booking.service';
import { DoctorService } from '../services/doctor.service';
import { UsersService } from '../services/users.service';
import { User } from '../shared/user';
@Component({
  selector: 'app-doctorsview',
  templateUrl: './doctorsview.component.html',
  styleUrls: ['./doctorsview.component.css']
})
export class DoctorsviewComponent implements OnInit {

  user: User;
  appointments : Booking[];
  errMess: string;
  constructor(private bookingservice : BookingService,
    private doctorservice : DoctorService,
    private usersservice : UsersService) { }

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
  update(id: string) {
    this.bookingservice.putAppointment(id);
  }



}
