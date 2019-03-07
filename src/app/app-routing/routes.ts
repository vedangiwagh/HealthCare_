import { Routes, CanActivate } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { DoctorsComponent } from '../doctors/doctors.component';
import { DoctordetailComponent } from '../doctordetail/doctordetail.component';
import { BookingComponent } from '../booking/booking.component';
import { UserprofileComponent } from '../userprofile/userprofile.component';
import { DoctorsviewComponent } from '../doctorsview/doctorsview.component';
import { from } from 'rxjs';

export const routes: Routes = [
  { path: 'home',  component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'appointment', component: DoctorsComponent },
  { path: 'doctordetail/:id', component: DoctordetailComponent },
  { path: 'myappointments', component: BookingComponent },
  { path: 'userprofile', component: UserprofileComponent },
  { path: 'doctorsview', component: DoctorsviewComponent }

];