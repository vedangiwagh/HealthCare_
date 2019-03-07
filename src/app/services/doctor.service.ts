import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';
import { Doctor } from '../shared/doctor';
@Injectable({
  providedIn: 'root'
})
export class DoctorService {

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


    getDoctors(): Observable<Doctor[]> {
      return this.afs.collection<Doctor>('doctors').snapshotChanges()
      .pipe(map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as Doctor;
          const _id = action.payload.doc.id;
          return { _id, ...data };
        });
      }));
    }

    postDoctor(name : string, specialization: string, location : string, description: string, start: number, end: number)
    {
      if (this.userId) {
        return this.afs.collection('doctors').doc(this.userId).set({name: name,email: this.username, specialization: specialization, location: location, description: description, start_time: start, end_time: end});
      } else {
        return Promise.reject(new Error('No User Logged In!'));
      }
    }
  
    getDoctor(id: string): Observable<Doctor> {
      return this.afs.doc<Doctor>('doctors/' + id).snapshotChanges()
      .pipe(map(action => {
          const data = action.payload.data() as Doctor;
          const _id = action.payload.id;
          return { _id, ...data };
        }));
    }
  
    getSpecializedDoctor(specialize: string): Observable<Doctor> {
      return this.afs.collection<Doctor>('doctors', ref => ref.where('specialization', '==', specialize)).snapshotChanges()
      .pipe(map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as Doctor;
          const _id = action.payload.doc.id;
          return { _id, ...data };
        })[0];
      }));
    }
  
    getDoctorIds(): Observable<String[] | any> {
      return this.getDoctors()
        .pipe(map(doctors => doctors.map(doctor => doctor._id)))
        .pipe(catchError(error => error ));
    } 
  
    postComment(doctorId: string, comment: any): Promise<any> {
      if (this.currentUser) {
        return this.afs.collection('doctors').doc(doctorId).collection('comments')
          .add({
            author: {
              '_id': this.currentUser.uid,
              'firstname' : this.currentUser.displayName ? this.currentUser.displayName : this.currentUser.email
            },
            rating: comment.rating,
            comment: comment.comment,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
          });
      } else {
        return Promise.reject(new Error('No User Logged In!'));
      }
    }
  
    getComments(doctorId: string): Observable<any> {
      return this.afs.collection('doctors').doc(doctorId).collection('comments').valueChanges();
    }
}
