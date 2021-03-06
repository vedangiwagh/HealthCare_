import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { Medicine } from '../shared/medicine';
import { Cart } from '../shared/cart';
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

  // deleteCart(): Promise<void> {
  //   const db = firebase.firestore();
  //   if (this.userId) {
  //     return db.collection('messages').getDocuments().then((snapshot) {
  //       return snapshot.documents.map((doc) {
  //         doc.reference.delete();
  //       });
  //     });
      
  //   } else {
  //     return Promise.reject(new Error('No User Logged In!'));
  //   }
  // }

  postCart(medicines: string,price: number,quantity:number, medid: string)
  {
    if(this.userId)
    {
      this.afs.collection('users/' + this.userId + '/cart').add({medicines: medicines,price: price, quantity:quantity, medicalid: medid});
    }
    else{
      return Promise.reject(new Error('No User Logged In!'));
    }
  }

  getCart(): Observable<Cart[]> {
    if(this.userId)
    {
      return this.afs.collection('users').doc(this.userId).collection<Cart>('cart').snapshotChanges()
      .pipe(map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as Cart;
          const _id = action.payload.doc.id;
          return { _id, ...data };
        });
      }));
    }
  }

  deleteMedicine(id: string): Promise<void> {
    const db = firebase.firestore();
    if (this.userId) {
        return db.doc('users/' + this.userId + '/cart/' + id).delete();
    } else {
      return Promise.reject(new Error('No User Logged In!'));
    }
  }

  isMedicine(id: string): Promise<boolean> {
    const db = firebase.firestore();
    if (this.userId) {
      return db.collection('users').doc(this.userId).collection('cart').where('medicines', '==', id).get()
      .then(doc => {
        return !doc.empty;
      });
    } else {
      return Promise.resolve(false);
    }
  }

  isMedical(id: string): Promise<boolean> {
    const db = firebase.firestore();
    if (this.userId) {
      return db.collection('users').doc(this.userId).collection('cart').where('medicalid', '==', id).get()
      .then(doc => {
        return !doc.empty;
      });
    } else {
      return Promise.resolve(false);
    }
  }

  postCartM(id:string, cart: Cart[])
  {
    if(this.userId)
    {
      this.afs.collection('medicals/' + id + '/orders').add({createdAt: firebase.firestore.FieldValue.serverTimestamp(),cart: cart, userid: this.userId});
    }
    else{
      return Promise.reject(new Error('No User Logged In!'));
    }
  }

  postCartU( cart: Cart[])
  {
    if(this.userId)
    {
      this.afs.collection('users/' + this.userId + '/orders').add({createdAt: firebase.firestore.FieldValue.serverTimestamp(),cart: cart});
    }
    else{
      return Promise.reject(new Error('No User Logged In!'));
    }
  }

  getOrders(id:string): Observable<any> {
    if(this.userId)
    {
      return this.afs.collection('medicals').doc(this.userId).collection('orders').doc(id).snapshotChanges()
      .pipe(map(action => {
        const data = action.payload.data() as any;
        const _id = action.payload.id;
        return { _id, ...data };
      }));
    }
  }

  getUserOrders(id:string): Observable<any> {
    if(this.userId)
    {
      return this.afs.collection('users').doc(this.userId).collection('orders').doc(id).snapshotChanges()
      .pipe(map(action => {
        const data = action.payload.data() as any;
        const _id = action.payload.id;
        return { _id, ...data };
      }));
    }
  }

  deleteorderM(mid: string, id:string): Promise<void> {
    const db = firebase.firestore();
    if (this.userId) {
        return db.doc('medicals/' + mid + '/orders/' + id).delete();
    } else {
      return Promise.reject(new Error('No User Logged In!'));
    }
  }

  deleteorderU(mid: string, id: string): Promise<void> {
    const db = firebase.firestore();
    if (this.userId) {
        return db.doc('users/' + mid + '/orders/' + id).delete();
    } else {
      return Promise.reject(new Error('No User Logged In!'));
    }
  }



}
