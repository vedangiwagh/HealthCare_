import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { DoctorService } from '../services/doctor.service';
import { MedicalsService } from '../services/medicals.service';
import { PatientsService } from '../services/patients.service';
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  userid: string;
  name: string;
  phno: number;
  category: string;
  gender: string = "Gender";
  bldgrp: string;
  height: string;
  weight: string = "5";
  location: string;
  specialization: string;
  start_time: number = 0;
  end_time: number = 0;
  description: string;
  age: number;
  constructor(private usersservice : UsersService,
    private doctorservice: DoctorService,
    private patientservice: PatientsService,
    private medicalservice: MedicalsService) { }

  ngOnInit() {
    this.usersservice.getUser()
    .subscribe(user => {
      this.category = user.category;
      this.userid = user._id;
      if(this.category == 'doctor')
      {
        this.doctorservice.getDoctor(this.userid)
        .subscribe(doctor => {
          this.name = doctor.name;
          this.specialization = doctor.specialization;
          this.location = doctor.location;
          this.description = doctor.description;
          this.start_time = doctor.start_time;
          this.end_time = doctor.end_time
          this.gender = doctor.gender;
        })
      }
      else if(this.category == 'patient')
      {
        this.patientservice.getPatient(this.userid)
        .subscribe(doctor => {
          this.name = doctor.name;
          this.bldgrp = doctor.bloodgroup;
          this.age = doctor.age;
          this.height = doctor.height;
          this.weight = doctor.weight;
          this.gender = doctor.gender;
          this.phno = doctor.contact;
        });
      }
      else if(this.category == 'medical')
      {
        this.medicalservice.getMedical(this.userid)
        .subscribe(medical => {
          this.location = medical.location
          this.name = medical.name;
          this.phno = medical.contact;
        });
      }
    })
  }
  saveprofile()
  {
    if(this.category == 'doctor')
    {
      this.usersservice.postDoc(this.category, this.name);
      this.doctorservice.isDoctor()
      .then(value => {
        if(!value)
        {
          this.doctorservice.postDoctor(this.name, this.specialization ,this.location,this.gender, this.description, this.start_time, this.end_time);
        }
        else
        {
          this.doctorservice.putDoctor(this.name, this.specialization, this.location, this.description,this.gender, this.start_time, this.end_time);
        }
      });
    }
    else if(this.category == 'patient')
    {
      this.usersservice.postPatient(this.category, this.name);
      this.patientservice.isPatient()
      .then(value => {
        if(!value)
        {
          this.patientservice.postPatient(this.name, this.phno,this.gender, this.bldgrp,this.height,this.weight,this.age);
        }
        else
        {
          this.patientservice.putPatient(this.name, this.phno,this.gender, this.bldgrp,this.height,this.weight,this.age);
        }
      });
    }
    else if(this.category == 'medical')
    {
      this.usersservice.postMed(this.category, this.name, this.location,this.phno);
      this.medicalservice.isMedical()
      .then(value => {
        if(!value)
        {
          this.medicalservice.postMedical(this.name, this.location, this.phno);
        }
        else
        {
          this.medicalservice.putMedical(this.name, this.location, this.phno);        }
      });
    }
  }

}
