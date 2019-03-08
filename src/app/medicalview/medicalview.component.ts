import { Component, OnInit } from '@angular/core';
import { MedicineService } from '../services/medicine.service';
import { Medicines } from '../shared/medicines';
import { Medicine } from '../shared/medicine';
@Component({
  selector: 'app-medicalview',
  templateUrl: './medicalview.component.html',
  styleUrls: ['./medicalview.component.css']
})
export class MedicalviewComponent implements OnInit {

  medicines: Medicines[];
  selectedMedicine: Medicine;
  constructor(private medicineservice : MedicineService) { }

  ngOnInit() {
    this.medicineservice.getAllmedicines()
    .subscribe(medicines => {
      this.medicines = medicines;
    });
  }

}
