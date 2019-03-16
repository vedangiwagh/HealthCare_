import { Routes, CanActivate } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { DoctorsComponent } from '../doctors/doctors.component';
import { DoctordetailComponent } from '../doctordetail/doctordetail.component';
import { BookingComponent } from '../booking/booking.component';
import { UserprofileComponent } from '../userprofile/userprofile.component';
import { DoctorsviewComponent } from '../doctorsview/doctorsview.component';
import { MedicalsComponent } from '../medicals/medicals.component';
import { MedicaldetailComponent } from '../medicaldetail/medicaldetail.component';
import { CartComponent } from '../cart/cart.component';
import { UserdetailComponent } from '../userdetail/userdetail.component';
import { from } from 'rxjs';
import { MedicalviewComponent } from '../medicalview/medicalview.component';
import { PrescriptionsComponent } from '../prescriptions/prescriptions.component'

export const routes: Routes = [
  { path: 'home',  component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'appointment', component: DoctorsComponent },
  { path: 'doctordetail/:id', component: DoctordetailComponent },
  { path: 'medicaldetail/:id', component: MedicaldetailComponent },
  { path: 'userdetail/:id', component: UserdetailComponent},
  { path: 'myappointments', component: BookingComponent },
  { path: 'managemedicines', component: MedicalviewComponent },
  { path: 'userprofile', component: UserprofileComponent },
  { path: 'doctorsview', component: DoctorsviewComponent },
  { path: 'buymedicines', component: MedicalsComponent},
  { path: 'cart', component: CartComponent},
  { path: 'appointment/:id', component: PrescriptionsComponent},

];
