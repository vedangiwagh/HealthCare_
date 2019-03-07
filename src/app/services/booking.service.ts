import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { Booking, BookingDoc } from '../shared/booking';
import { throwError } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class BookingService {

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
    // getAppointment(doctorid): Observable<BookingDoc[]> {
    //   if (this.userId) {
    //     return this.afs.collection<BookingDoc>('appointments', ref => ref.where('doctor', '==', doctorid)).valueChanges();
    //   } 
    // }
    postAppointment(name: string, id: string, date: string, time: number) {
      if (this.userId) {
        return this.afs.collection('appointments').add({userid: this.userId, doctor: name, docid: id, date:date, time:time });
      } else {
        return Promise.reject(new Error('No User Logged In!'));
      }
    }
    isAppointment(id: string): Promise<boolean> {
      const db = firebase.firestore();
      if (this.userId) {
        return db.collection('appointments').where('user', '==', this.userId).where('doctor', '==', id).get()
        .then(doc => {
          return !doc.empty;
        });
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
