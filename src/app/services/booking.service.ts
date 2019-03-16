import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { PatientsService } from '../services/patients.service';
import { Booking, BookingDoc } from '../shared/booking';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BookingService {


  userId: string = undefined;
  username: string = undefined;
  private currentUser: firebase.User = null;
  constructor(private afs: AngularFirestore,
    private authService: AuthService,
    private patientservice: PatientsService) { 
      this.authService.getAuthState()
      .subscribe((user) => {
        if (user) {
          // User is signed in.
          this.userId = user.uid;
          this.patientservice.getPatient(this.userId)
          .subscribe(patient => {
            this.username = patient.name;
          })
        } else {
          this.userId = undefined;
        }
      });


    }

    getAppointment(id): Observable<Booking> {
      if(this.userId)
      {
        return this.afs.doc<Booking>('appointments/' + id).snapshotChanges()
          .pipe(map(action => {
            const data = action.payload.data() as Booking;
            const _id = action.payload.id;
            return { _id, ...data };
          }));
      }
    }

    getAppointments(): Observable<Booking[]> {
      if (this.userId) {
        return this.afs.collection<Booking>('appointments', ref => ref.where('userid', '==', this.userId)).snapshotChanges()
        .pipe(map(actions => {
          return actions.map(action => {
            const data = action.payload.doc.data() as Booking;
            const _id = action.payload.doc.id;
            return { _id, ...data };
          });
        }));
      } else {
        return throwError('No User Logged In!');
      }
    }
    getDoctorAppointments(): Observable<Booking[]> {
      if(this.userId) {
        return this.afs.collection<Booking>('appointments', ref => ref.where('docid', '==', this.userId)).snapshotChanges()
        .pipe(map(actions => {
          return actions.map(action => {
            const data = action.payload.doc.data() as Booking;
            const _id = action.payload.doc.id;
            return { _id, ...data };
          });
        }));
      } else {
        return throwError('No User Logged In!');
      }
    }
    // getAppointment(doctorid): Observable<Booking> {
    //   if (this.userId) {
    //     return this.afs.collection<Booking>('appointments', ref => ref.where('doctor', '==', doctorid)).snapshotChanges()
    //     .pipe(map(actions => {
    //       return actions.map(action => {
    //         const data = action.payload.doc.data() as Booking;
    //         const _id = action.payload.doc.id;
    //         return { _id, ...data };
    //       });
    //     }));
    //   } else {
    //     return throwError('No User Logged In!');
    //   }
    //   } 
    // }

      // getAppointment(id): Observable <Booking> {
      //   if(this.userId)
      //   {
      //     return this.afs.doc('appointments)
      //   }
      // }
    postAppointment(name: string, id: string, date: string, time: number, dt: string) {
      if (this.userId) {
        return this.afs.collection('appointments').add({userid: this.userId, doctor: name, docid: id, date:date, time:time, date_time: dt, user: this.username, status: false });
      } else {
        return Promise.reject(new Error('No User Logged In!'));
      }
    }

    // putAppointment(name: string, id: string, date: string, time: number, dt: string, status: boolean) {
    //   if (this.userId) {
    //     return this.afs.collection('appointments').add({userid: this.userId, doctor: name, docid: id, date:date, time:time, date_time: dt, user: this.username, status: false });
    //   } else {
    //     return Promise.reject(new Error('No User Logged In!'));
    //   }
    // }

    isAppointment(id: string): Promise<boolean> {
      const db = firebase.firestore();
      if (this.userId) {
        return db.collection('appointments').where('userid', '==', this.userId).where('docid', '==', id).get()
        .then(doc => {
          return !doc.empty;
        });
      } else {
        return Promise.resolve(false);
      }
    }
    checkDatetime(id: string, dt: string): Promise<boolean>
    {
      const db = firebase.firestore();
      if(this.userId) {
        return db.collection('appointments').where('docid', '==', id).where('date_time', '==', dt).get()
        .then(doc => {
          return !doc.empty;
        })
      } else {
        return Promise.resolve(false);
      }
    }

    deleteAppointment(id: string): Promise<void> {
      const db = firebase.firestore();
      if (this.userId) {
          return db.doc('appointments/' + id).delete();
      } else {
        return Promise.reject(new Error('No User Logged In!'));
      }
    }


  

}
