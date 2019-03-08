import { Component, OnInit } from '@angular/core';
import { MedicineService } from '../services/medicine.service';
import { MedicalsService } from '../services/medicals.service';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { Medicines } from '../shared/medicines';
import { Medicine } from '../shared/medicine';
@Component({
  selector: 'app-medicalview',
  templateUrl: './medicalview.component.html',
  styleUrls: ['./medicalview.component.css']
})
export class MedicalviewComponent implements OnInit {

  name: string;
  description: string;
  userid : string;
  med: Medicine[];
  medicines: Medicines[];
  medic = false;
  medic1 = false;

  selectedMedicine: string;
  constructor(private medicineservice : MedicineService,
    private medicalservice: MedicalsService,
    private authService: AuthService,
    private usersservice: UsersService) { }

  ngOnInit() {
    this.medicineservice.getAllmedicines()
    .subscribe(medicines => {
      this.medicines = medicines;
    });
    this.authService.getAuthState()
        .subscribe((user) => {
        if (user) {
          this.userid = user.uid;
          this.medicalservice.getMedicines(this.userid)
          .subscribe(medicines => {
            this.med = medicines;
          });
        }
      });
  }
  addMedicine(medicine: string, price: number)
  {
    this.medicalservice.isMedicine(medicine)
    .then(value => {
      this.medic = value;
      if(!this.medic)
      {
        this.medicineservice.getMedicine(medicine)
        .subscribe(medicines => {
          this.medicalservice.postMedicine(medicine, medicines.description, price);
        });
      }
    });
  }
  deleteMedicine(id: string) {
    this.medicalservice.getMedicin(id)
    .subscribe(medicine => {
      this.medicalservice.deleteMedicine(medicine._id);
    })
  }

  addMed(id: string, description: string) {
    this.medicineservice.isMedicine(id)
    .then(value => {
      this.medic1 = value;
      if(!this.medic1)
      {
        this.medicineservice.postMedicine(id, description);
      }
    });
  }

}
