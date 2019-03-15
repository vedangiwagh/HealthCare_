import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';
import { Patient } from '../shared/patient';
@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  userId: string;
  username: string;
  private currentUser: firebase.User = null;
  constructor(private afs: AngularFirestore,
    private authService: AuthService) { 
      this.authService.getAuthState()
      .subscribe((user) => {
        if (user) {
          // User is signed in.
          this.currentUser = user;
          this.userId = user.uid;
          this.username = user.email;
        } else {
          this.currentUser = null;
        }
      });
    }

    isPatient(): Promise<boolean> {
      const db = firebase.firestore();
      if (this.userId) {
        return db.collection('patients').doc(this.userId).get()
        .then(doc => {
          if(doc.exists) {
            return Promise.resolve(true);
          }
        });
      } else {
        return Promise.resolve(false);
      }
    }

    putPatient(name:string, phno:number, gender: string, bldgrp: string, height: string, weight: string, age: number) {
      if (this.userId) {
        return this.afs.collection('patients').doc(this.userId).update({ name: name,email: this.username, contact: phno, gender: gender, bloodgroup: bldgrp, height: height, weight: weight, age: age});
      } else {
        return Promise.reject(new Error('No User Logged In!'));
      }
    }

    postPatient(name:string, phno:number, gender: string, bldgrp: string, height: string, weight: string, age: number) {
      if (this.userId) {
        return this.afs.collection('patients').doc(this.userId).set({ name: name,email: this.username, contact: phno, gender: gender, bloodgroup: bldgrp, height: height, weight: weight, age: age});
      } else {
        return Promise.reject(new Error('No User Logged In!'));
      }
    }

    getPatient(id: string)
    {
      return this.afs.doc<Patient>('patients/' + id).snapshotChanges()
      .pipe(map(action => {
          const data = action.payload.data() as Patient;
          const _id = action.payload.id;
          return { _id, ...data };
        }));
    }
}
