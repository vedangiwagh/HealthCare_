import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { PatientsService } from '../services/patients.service';
import { Patient } from '../shared/patient';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {

  patient: Patient;
  user_category: string;
  constructor(private route: ActivatedRoute,
    private authService: AuthService,
    private location: Location,
    private usersservice : UsersService,
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
    })
  }

}
