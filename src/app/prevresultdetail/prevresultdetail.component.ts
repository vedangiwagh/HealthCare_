import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { PatientsService } from '../services/patients.service';
import { Patient } from '../shared/patient';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { InfermedicaService } from '../services/infermedica.service';
import * as jspdf from 'jspdf'; 
import html2canvas from 'html2canvas';  
@Component({
  selector: 'app-prevresultdetail',
  templateUrl: './prevresultdetail.component.html',
  styleUrls: ['./prevresultdetail.component.css']
})
export class PrevresultdetailComponent implements OnInit {

  cpatient: Patient;
  user_category: string;
  result: any;
  constructor(private route: ActivatedRoute,
    private authService: AuthService,
    private location: Location,
    private usersservice : UsersService,
    private patientservice : PatientsService,
    private infermedica: InfermedicaService) { }

  ngOnInit() {
    this.authService.getAuthState()
        .subscribe((user) => {
        if (user) {
          // User is signed in.
          this.usersservice.getUser()
          .subscribe((user) => {
          if(user) {
            this.user_category = user.category;
          }
          else{
            console.log('Not defined');
          }
        });
      }
      });
    this.route.params.pipe(switchMap((params: Params) => this.infermedica.getResult(params['userid'],params['id'])))
    .subscribe(result => {
      console.log(result)
      this.result = result;
    })
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
      pdf.save('result.pdf'); // Generated PDF   
    });  
  }

}
