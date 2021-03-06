import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule} from './app-routing/app-routing.module';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctordetailComponent } from './doctordetail/doctordetail.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BookingComponent } from './booking/booking.component';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IntlModule } from '@progress/kendo-angular-intl';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { DoctorsviewComponent } from './doctorsview/doctorsview.component';
import { MedicalsComponent } from './medicals/medicals.component';
import { MedicaldetailComponent } from './medicaldetail/medicaldetail.component';
import { CartComponent } from './cart/cart.component';
import { UserdetailComponent } from './userdetail/userdetail.component';
import { MedicalviewComponent } from './medicalview/medicalview.component';
import { PrescriptionsComponent } from './prescriptions/prescriptions.component';
import { PrescriptionviewComponent } from './prescriptionview/prescriptionview.component';
import { PrescriptiondetailComponent } from './prescriptiondetail/prescriptiondetail.component';
import { MedicalcartComponent } from './medicalcart/medicalcart.component';
import { OrderdetailComponent } from './orderdetail/orderdetail.component';
import { UserordersComponent } from './userorders/userorders.component';
import { UserorderdetailComponent } from './userorderdetail/userorderdetail.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { HttpModule } from '@angular/http';
import { DoctornearComponent } from './doctornear/doctornear.component';
import { PrevprescriptionsComponent } from './prevprescriptions/prevprescriptions.component';
import { PrevallComponent } from './prevall/prevall.component';
import { PrevresultdetailComponent } from './prevresultdetail/prevresultdetail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    DoctorsComponent,
    DoctordetailComponent,
    BookingComponent,
    UserprofileComponent,
    DoctorsviewComponent,
    MedicalsComponent,
    MedicaldetailComponent,
    CartComponent,
    UserdetailComponent,
    MedicalviewComponent,
    PrescriptionsComponent,
    PrescriptionviewComponent,
    PrescriptiondetailComponent,
    MedicalcartComponent,
    OrderdetailComponent,
    UserordersComponent,
    UserorderdetailComponent,
    ChatbotComponent,
    DoctornearComponent,
    PrevprescriptionsComponent,
    PrevallComponent,
    PrevresultdetailComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    Ng2SearchPipeModule,
    DateInputsModule,
    IntlModule,
    HttpModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
