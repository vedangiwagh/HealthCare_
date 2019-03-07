import { Component, OnInit } from '@angular/core';
import { Medical } from '../shared/medical';
import { MedicalsService } from '../services/medicals.service';
import { from } from 'rxjs';
@Component({
  selector: 'app-medicals',
  templateUrl: './medicals.component.html',
  styleUrls: ['./medicals.component.css']
})
export class MedicalsComponent implements OnInit {

  medicals : Medical[];
  selectedMedical : Medical;
  errMess : string;
  constructor(private medicalsservice : MedicalsService) { }

  ngOnInit() {
    this.medicalsservice.getMedicals()
    .subscribe(medicals => this.medicals = medicals,
      errmess => this.errMess = <any>errmess);
  }

  onSelect(medical: Medical) {
    this.selectedMedical = medical;
  }

}
