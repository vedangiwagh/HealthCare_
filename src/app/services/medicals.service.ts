import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase/app';
import { User } from '../shared/user'; 
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { Medical } from '../shared/medical';
import { Medicine } from '../shared/medicine';
@Injectable({
  providedIn: 'root'
})
export class MedicalsService {

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

    getMedicals(): Observable<Medical[]> {
      return this.afs.collection<Medical>('medicals').snapshotChanges()
      .pipe(map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as Medical;
          const _id = action.payload.doc.id;
          return { _id, ...data };
        });
      }));
    }

    getMedical(id: string): Observable<Medical> {
      return this.afs.doc<Medical>('medicals/' + id).snapshotChanges()
      .pipe(map(action => {
          const data = action.payload.data() as Medical;
          const _id = action.payload.id;
          return { _id, ...data };
        }));
    }

    getMedicines(medicalId: string): Observable<Medicine[]> {
      return this.afs.collection('medicals').doc(medicalId).collection<Medicine>('medicines').valueChanges();
    }

    getMedicine(medicalId: string,medicine: string): Observable<any> {
      return this.afs.collection('medicals').doc(medicalId).collection('medicines', ref => ref.where('name', '==', medicine)).valueChanges();
      // .pipe(map(actions => {
      //   return actions.map(action => {
      //     const data = action.payload.doc.data() as Medicine;
      //     const _id = action.payload.doc.id;
      //     return { _id, ...data };
      //   })[0];
      // }));
    }

    postMedicine(medicine: string, description: string, price: number)
    {
      return this.afs.collection('medicals').doc(this.userId).collection('medicines').add({name : medicine, description: description, price: price})
    }

    // deleteMedicine(id: string): Promise<void> {
    //   const db = firebase.firestore();
    //   if (this.userId) {
    //       return db.doc('medicals/' + this.userId + '/medicines/' +  ).delete();
    //   } else {
    //     return Promise.reject(new Error('No User Logged In!'));
    //   }
    // }

    getMedicin(id: string): Observable<Medicine> {
      return this.afs.collection('medicals').doc(this.userId).collection('medicines', ref => ref.where('name', '==', id)).snapshotChanges()
      .pipe(map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as Medicine;
          const _id = action.payload.doc.id;
          return { _id, ...data };
          })[0];
        }));
    }
    deleteMedicine(id: string): Promise<void> {
      const db = firebase.firestore();
      if (this.userId) {
          return db.doc('medicals/' + this.userId + '/medicines/' +  id).delete();
      } else {
        return Promise.reject(new Error('No User Logged In!'));
      }
    }

    isMedicine(id: string): Promise<boolean> {
      const db = firebase.firestore();
      if (this.userId) {
        return db.collection('medicals').doc(this.userId).collection('medicines').where('name', '==', id).get()
        .then(doc => {
          return !doc.empty;
        });
      } else {
        return Promise.resolve(false);
      }
    }
}
