import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user = {username: '', password: '', remember: false};
  user1 = {username: '', password: '', remember: false};
  username : string = undefined;
  usern : boolean = false;
  errMess: string;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getAuthState()
      .subscribe((user) => {
        if (user) {
          // User is signed in.
          this.username = user.displayName ? user.displayName : user.email;
          this.usern = true;
          console.log('Logged In ', this.username);
        } else {
          console.log('Not Logged In');
          this.usern = false;
          this.username = undefined;
        }
      });
  }
  onSubmitlogin() {
    console.log('User: ', this.user);
    this.authService.logIn(this.user);
  }
  onSubmitsign() {
    console.log('User: ', this.user1);
    this.authService.signUp(this.user1);
  }
  googleLogin() {
    this.authService.googleLogin();
  }

  logOut() {
    this.username = undefined;
    this.authService.logOut();
  }

}
