import { Component, OnInit } from '@angular/core';
import { PrescriptionService } from '../services/prescription.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { Prescription } from '../shared/prescription';
import { BookingService } from '../services/booking.service';
import { Medpress } from '../shared/medpres';
import { AuthService } from '../services/auth.service';
import * as jspdf from 'jspdf'; 
import html2canvas from 'html2canvas';  

@Component({
  selector: 'app-prescriptiondetail',
  templateUrl: './prescriptiondetail.component.html',
  styleUrls: ['./prescriptiondetail.component.css']
})
export class PrescriptiondetailComponent implements OnInit {

  userid:string;
  Userid:string;
  prescription: Prescription;
  constructor(private prescriptionservice: PrescriptionService,private route: ActivatedRoute,
    private location: Location,
    private authService: AuthService,
    private bookingservice: BookingService) { }

  ngOnInit() {
    this.authService.getAuthState()
        .subscribe((user) => {
        if (user) {
          // User is signed in.
          this.userid = user.uid;
        } else {
          console.log('Wrong Password or Username');
        }
      });
    this.route.params.pipe(switchMap((params: Params) => this.bookingservice.getAppointment(params['id'])))
    .subscribe(app => {
      this.Userid = app.userid;
      this.route.params.pipe(switchMap((params: Params) => this.prescriptionservice.getPrescription(this.Userid,params['id'])))
      .subscribe(prescription => {
          this.prescription = prescription;
        this.route.params.pipe(switchMap((params: Params) => 
      this.prescriptionservice.getAllMed(this.Userid,params['id'])))
      .subscribe(medicines => {
        this.prescription.medicines = medicines;
        console.log(this.prescription.medicines);
      })
      })
      
    });
  }

  public captureScreen()  
  {  
    var data = document.getElementById('contentToConvert');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('prescription.pdf'); // Generated PDF   
    });  
  }

}
