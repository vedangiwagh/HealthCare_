import { Component, OnInit } from '@angular/core';
import { Doctor } from '../shared/doctor';
import { DoctorService} from '../services/doctor.service';
import { from } from 'rxjs';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { InfermedicaService } from '../services/infermedica.service';
import { UsersService } from '../services/users.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-doctornear',
  templateUrl: './doctornear.component.html',
  styleUrls: ['./doctornear.component.css']
})
export class DoctornearComponent implements OnInit {

  doctors: Doctor[];
  errMess: string;
  loc: string;
  selectedDoctor: Doctor;
  constructor(private doctorservice : DoctorService,
    private route: ActivatedRoute,
    private location: Location,
    private infermedica: InfermedicaService,
    private usersservice: UsersService,
    private authService: AuthService) { }

  ngOnInit() {
    this.authService.getAuthState()
        .subscribe((user) => {
        if (user) {
          // User is signed in.
          this.usersservice.getUser()
          .subscribe((user) => {
          if(user) {
            this.loc = user.location;
            this.infermedica.docnearme(this.loc)
              .subscribe(doctors => this.doctors = doctors,
                errmess => this.errMess = <any>errmess);
          }
          else{
            console.log('Not defined');
          }
        });
        }
      });
  }
  onSelect(doctor: Doctor) {
    this.selectedDoctor = doctor;
  }

}
