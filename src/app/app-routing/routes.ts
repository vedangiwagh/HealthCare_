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
import { PrescriptionviewComponent } from '../prescriptionview/prescriptionview.component'
import { PrescriptiondetailComponent } from '../prescriptiondetail/prescriptiondetail.component'
import { MedicalcartComponent } from '../medicalcart/medicalcart.component';
import { OrderdetailComponent } from '../orderdetail/orderdetail.component';
import { UserordersComponent } from '../userorders/userorders.component';
import { UserorderdetailComponent } from '../userorderdetail/userorderdetail.component';
import { ChatbotComponent } from '../chatbot/chatbot.component';
import { DoctornearComponent } from '../doctornear/doctornear.component';
import { PrevprescriptionsComponent } from '../prevprescriptions/prevprescriptions.component';
import { PrevallComponent } from '../prevall/prevall.component';
import { PrevresultdetailComponent } from '../prevresultdetail/prevresultdetail.component'

export const routes: Routes = [
  { path: 'home',  component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'appointment', component: DoctorsComponent },
  { path: 'doctordetail/:id', component: DoctordetailComponent },
  // { path: 'medicaldetail/:id', component: MedicaldetailComponent },
  { path: 'userdetail/:id', component: UserdetailComponent},
  { path: 'myappointments', component: BookingComponent },
  // { path: 'managemedicines', component: MedicalviewComponent },
  { path: 'userprofile', component: UserprofileComponent },
  { path: 'doctorsview', component: DoctorsviewComponent },
  // { path: 'buymedicines', component: MedicalsComponent},
  // { path: 'cart', component: CartComponent},
  { path: 'appointment/:id', component: PrescriptionsComponent},
  { path: 'prescriptions', component: PrescriptionviewComponent},
  { path: 'prescriptiondetail/:id', component: PrescriptiondetailComponent},
  // { path: 'myorders', component: MedicalcartComponent},
  // { path: 'orderdetail/:id', component: OrderdetailComponent},
  // { path: 'orderdetails/:id', component: UserorderdetailComponent},
  // { path: 'orders', component: UserordersComponent},
  { path: 'chat', component: ChatbotComponent},
  { path: 'doc', component: DoctornearComponent},
  { path: 'prevprescription/:id', component: PrevprescriptionsComponent},
  { path: 'prevresult/:id', component: PrevallComponent},
  { path: 'prevalldetail/:userid/:id', component: PrevresultdetailComponent}

];
