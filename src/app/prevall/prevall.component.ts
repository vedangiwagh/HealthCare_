import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { PatientsService } from '../services/patients.service';
import { Patient } from '../shared/patient';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { PrescriptionService } from '../services/prescription.service';
import { Prescription } from '../shared/prescription';
import { InfermedicaService } from '../services/infermedica.service';
@Component({
  selector: 'app-prevall',
  templateUrl: './prevall.component.html',
  styleUrls: ['./prevall.component.css']
})
export class PrevallComponent implements OnInit {

  patient: Patient;
  user_category: string;
  results: any[];
  constructor(private route: ActivatedRoute,
    private authService: AuthService,
    private location: Location,
    private usersservice : UsersService,
    private prescriptionservice: PrescriptionService,
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
    this.route.params.pipe(switchMap((params: Params) => this.patientservice.getPatient(params['id'])))
    .subscribe(user => {
      this.patient = user;
      this.infermedica.getresults(this.patient._id)
    .subscribe(results => {
      console.log(results);
      this.results = results;
    })
    })
  }


}
