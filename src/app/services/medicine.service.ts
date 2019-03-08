import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { Medical } from '../shared/medical';
import { Medicines } from '../shared/medicines';
import { Medicine } from '../shared/medicine';
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

    getMedicine(id: string): Observable<Medicines> {
      return this.afs.doc<Medicines>('medicines/' + id).snapshotChanges()
      .pipe(map(action => {
        const data = action.payload.data() as Medicines;
        const _id = action.payload.id;
        return { _id, ...data };
      }));
    }

    isMedicine(id: string): Promise<boolean> {
      const db = firebase.firestore();
      if (this.userId) {
        return db.collection('medicines').doc(id).get()
        .then(doc => {
          if(doc.exists) {
            return Promise.resolve(true);
          }
        });
      } else {
        return Promise.resolve(false);
      }
    }

    postMedicine(id: string, description: string) {
      if (this.userId) {
        return this.afs.collection('medicines').doc(id).set({description: description});
      }
      else {
        return Promise.reject(new Error('No User Logged In!'));
      }
    }



}
