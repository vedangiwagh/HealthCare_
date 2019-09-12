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
@Component({
  selector: 'app-prevprescriptions',
  templateUrl: './prevprescriptions.component.html',
  styleUrls: ['./prevprescriptions.component.css']
})
export class PrevprescriptionsComponent implements OnInit {

  patient: Patient;
  user_category: string;
  prescription: Prescription[];
  constructor(private route: ActivatedRoute,
    private authService: AuthService,
    private location: Location,
    private usersservice : UsersService,
    private prescriptionservice: PrescriptionService,
    private patientservice : PatientsService) { }

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
      this.prescriptionservice.getPrev(this.patient._id)
    .subscribe(prescriptions => {
      this.prescription = prescriptions;
    })
    })
  }

}
