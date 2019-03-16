import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { Medpress } from '../shared/medpres';
@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  userId: string = undefined;
  username: string = undefined;
  private currentUser: firebase.User = null;
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

  postPrescription(patient: string, date: string, doctor: string, location: string, date_time: string)
  {
    if(this.userId)
    {
      return this.afs.collection('patients').doc(patient).collection('prescriptions').doc(date_time).set({ doctor: doctor,location: location,date: date })
    }
    else{
      return Promise.reject(new Error('No User Logged In!'));
    }
  }
  postMed(medicine: string,quantity: number, patient: string, date:string, date_time: string, description: string)
  {
    if(this.userId)
    {
      return this.afs.collection('patients').doc(patient).collection('prescriptions').doc(date_time).collection('medicines').doc(medicine).set({medicine:medicine, quantity: quantity,description: description});
    }
    else{
      return Promise.reject(new Error('No User Logged In!'));
    }
  }
  getAllMed(patient: string,date_time: string): Observable<Medpress[]> {
    if(this.userId)
    {
      return this.afs.collection('patients').doc(patient).collection('prescriptions').doc(date_time).collection<Medpress>('medicines').valueChanges()
      // .pipe(map(actions => {
      //   return actions.map(action => {
      //     const data = action.payload.doc.data() as Medpress;
      //     const _id = action.payload.doc.id;
      //     return { _id, ...data };
      //   })[0];
      // }));
    }

  }
  delMed(patient: string, id:string, date_time:string): Promise<void> {
    const db = firebase.firestore();
    if (this.userId) {
        return db.doc('patients/' + patient + '/prescriptions/' + date_time + '/medicines/' + id).delete();
    } else {
      return Promise.reject(new Error('No User Logged In!'));
    }
  }
}

