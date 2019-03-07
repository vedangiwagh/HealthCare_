import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { Medicine } from '../shared/medicine';
@Injectable({
  providedIn: 'root'
})
export class CartService {

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

  postCart(medicines: string,price: number,quantity:number)
  {
    if(this.userId)
    {
      this.afs.collection('users/' + this.userId + 'cart').add({medicines: medicines,price: price, quantity:quantity});
    }
    else{
      return Promise.reject(new Error('No User Logged In!'));
    }
  }



}
