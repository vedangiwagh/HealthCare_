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

  appointments = { user: '', doctors: []};
  bookappointment: BookingDoc[];
  errMess: string;
  favorite: BookingDoc;
  constructor(private bookingservice : BookingService,
    private doctorservice : DoctorService) { }

  ngOnInit() {
    this.bookingservice.getAppointments()
      .subscribe(appointments => {
        this.appointments = { user: '', doctors: []};
        appointments.forEach(appointment => {
          this.doctorservice.getDoctor(appointment.doctor)
            .subscribe(doctor => {
              this.appointments.doctors.push(doctor);
            });
        });
      },
      errmess => this.errMess = <any>errmess);
  }

  cancelAppointment(id: string) {
    this.bookingservice.deleteAppointment(id)
      .then(() => {
        this.bookingservice.getAppointments()
        .subscribe(appointment => {
          this.appointments = { user: '', doctors: []};
          appointment.forEach(appointment => {
            this.doctorservice.getDoctor(appointment.doctor)
              .subscribe(doctor => {
                this.appointments.doctors.push(doctor);
              });
          });
        });
      },
      errmess => this.errMess = <any>errmess);
  }

}
