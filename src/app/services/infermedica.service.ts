import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/user';
import { Doctor } from '../shared/doctor';
import * as firebase from 'firebase/app';
const headerDict = {
  'Content-Type': 'application/json',
  'App-Id': 'fdf34a83',
  'App-Key': 'c90e3963187451a6e4c45713602382e2'
}
const requestOptions = {                                                                                                                                                                                 
  headers: new Headers(headerDict), 
};
@Injectable({
  providedIn: 'root'
})

export class InfermedicaService {
  userId: string = undefined;
  username: string = undefined;
  loc: string;
  private currentUser: firebase.User = null;
  constructor(private afs: AngularFirestore,
    private authService: AuthService,
    private http: Http) { 
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
  postResults(result: any,symp: any)
  {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp()
    console.log(result);
    if(this.userId)
    {
      return this.afs.collection('patients').doc(this.userId).collection('results').add({"prediction": result,"symptoms": symp,"timestamp": timestamp})
    }
    else{
      return Promise.reject(new Error('No User Logged In!'));
    }
  }
  nlp(text: string): Observable<any>
  {
    console.log(text);
    return this.http.post("https://api.infermedica.com/v2/parse",{"text": text},requestOptions)
  }
  getsymptom(id: string): Observable<any>
  {
    return this.http.get("https://api.infermedica.com/v2/symptoms/" + id,requestOptions);
  }
  diagnosis(evidence: any,sex: string,age: number)
  {
    // var evidence = JSON.stringify(diag);
    console.log({"sex": sex,
    "age": age,
    "evidence": evidence});
    return this.http.post("https://api.infermedica.com/v2/diagnosis",{"sex": sex,
    "age": age,
    "evidence": evidence
  },requestOptions)
  }
  docnearme(loc: string):Observable<Doctor[]>
  {
    if(loc)
    {
      return this.afs.collection<Doctor>('doctors',ref => ref.where('location', '==', loc)).snapshotChanges()
      .pipe(map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as Doctor;
          const _id = action.payload.doc.id;
          return { _id, ...data };
        });
      }));
    }
  }
  getUser()
    {
      return this.afs.doc<User>('users/' + this.userId).snapshotChanges()
      .pipe(map(action => {
          const data = action.payload.data() as User;
          const _id = action.payload.id;
          return { _id, ...data };
        }));
    }
    getresults(id: string): Observable<any[]>
    {
      if(id)
      {
        return this.afs.collection('patients').doc(id).collection<any>('results').snapshotChanges()
        .pipe(map(actions => {
          return actions.map(action => {
            const data = action.payload.doc.data() as any;
            const _id = action.payload.doc.id;
            return { _id, ...data };
          });
        }));
      }
    }
    getResult(userid: string,id: string): Observable<any>
    {
      if(userid)
      {
          return this.afs.collection('patients').doc(userid).collection('results').doc<any>(id).valueChanges();
          // .pipe(map(action => {
          //   const data = action.payload.data() as Prescription;
          //   const _id = action.payload.id;
          //   return { _id, ...data };
          // }));
      }
    }
}
