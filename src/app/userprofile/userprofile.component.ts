import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { from } from 'rxjs';
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  name: string;
  phno: string;
  category: string;
  gender: string = "male";
  bldgrp: string = "B+ve";
  height: string = "170cm";
  weight: string = "56kg";
  constructor(private usersservice : UsersService) { }

  ngOnInit() {
    // this.usersservice.postUser(this.name, this.phno, this.gender, this.bldgrp, this.height,  this.weight)
  }
  // saveprofile()
  // {

  // }

}
