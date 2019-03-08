import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { Medical } from '../shared/medical';
import { Medicines } from '../shared/medicines';
@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  userId: string = undefined;
  username: string = undefined;
  constructor(private afs: AngularFirestore,
    private authService: AuthService) { 
      this.authService.getAuthState()
      .subscribe((user) => {
        if (user) {
          // User is signed in.
          this.userId = user.uid;
          this.username = user.email;
        } else {
          this.userId = undefined;
        }
      });
    }

    getAllmedicines(): Observable<Medicines[]> {
      return this.afs.collection<Medicines>('medicines').snapshotChanges()
      .pipe(map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as Medicines;
          const _id = action.payload.doc.id;
          return { _id, ...data };
        });
      }));
    }
}
