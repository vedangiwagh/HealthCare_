import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase/app';
import { User } from '../shared/user'; 
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

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

    getUser(id: string)
    {
      return this.afs.doc<User>('users/' + id).snapshotChanges()
      .pipe(map(action => {
          const data = action.payload.data() as User;
          const _id = action.payload.id;
          return { _id, ...data };
        }));
    }
    postUser(name:string, phno:string, gender: string, bldgrp: string, height: string, weight: string) {
      if (this.userId) {
        return this.afs.collection('users').doc(this.userId).set({name: name,email: this.username, contact: phno, gender: gender, bloodgroup: bldgrp, height: height, weight: weight});
      } else {
        return Promise.reject(new Error('No User Logged In!'));
      }
    }

}
