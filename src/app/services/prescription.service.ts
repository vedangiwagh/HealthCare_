import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { Medpress } from '../shared/medpres';
import { Prescription } from '../shared/prescription';
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

  postPrescription(patient: string, date: string, doctor: string, location: string, date_time: string, description: string, doctorid: string, patientname: string)
  {
    if(this.userId)
    {
      return this.afs.collection('patients').doc(patient).collection('prescriptions').doc(date_time).set({ user: patientname,doctor: doctor,location: location,date: date, description: description, doctorid: doctorid})
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
  getAllMed(patient: string,id: string): Observable<Medpress[]> {
    if(this.userId)
    {
      return this.afs.collection('patients').doc(patient).collection('prescriptions').doc(id).collection<Medpress>('medicines').snapshotChanges()
      .pipe(map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as Medpress;
          const _id = action.payload.doc.id;
          return { _id, ...data };
        });
      }));
    }
  }
  getAllPRescription(): Observable<Prescription[]> {
    return this.afs.collection('patients').doc(this.userId).collection<Prescription>('prescriptions').snapshotChanges()
    .pipe(map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Prescription;
        const _id = action.payload.doc.id;
        return { _id, ...data };
      });
    }));
  }
  delMed(patient: string, id:string, date_time:string): Promise<void> {
    const db = firebase.firestore();
    if (this.userId) {
        return db.doc('patients/' + patient + '/prescriptions/' + date_time + '/medicines/' + id).delete();
    } else {
      return Promise.reject(new Error('No User Logged In!'));
    }
  }
  getPrescription(id:string): Observable<Prescription> {
    return this.afs.collection('patients').doc(this.userId).collection('prescriptions').doc<Prescription>(id).valueChanges();
    // .pipe(map(action => {
    //   const data = action.payload.data() as Prescription;
    //   const _id = action.payload.id;
    //   return { _id, ...data };
    // }));
  }
}

