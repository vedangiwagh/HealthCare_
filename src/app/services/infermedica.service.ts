import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
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
  postResults(result: any)
  {
    console.log(result);
    if(this.userId)
    {
      return this.afs.collection('patients').doc(this.userId).collection('results').add({"prediction": result})
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
}
