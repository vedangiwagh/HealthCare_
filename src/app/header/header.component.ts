import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';
import { UsersService } from '../services/users.service';
import { User } from '../shared/user';
import { from } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user = {username: '', password: '', remember: false};
  user1 = {username: '', password: '', remember: false};
  users : User;
  user_category: string;
  username : string = undefined;
  usern : boolean = false;
  userid: string;
  errMess: string;
  constructor(private authService: AuthService,
    private usersservice : UsersService) { }

  ngOnInit() {
    this.authService.getAuthState()
        .subscribe((user) => {
        if (user) {
          // User is signed in.
          this.usersservice.getUser(user.uid)
          .subscribe((user) => {
          if(user) {
            this.user_category = user.category;
          }
          else{
            console.log('Not defined');
          }
        });
          this.username = user.displayName ? user.displayName : user.email;
          this.usern = true;
          console.log('Logged In ', this.username);
        } else {
          console.log('Not Logged In');
          this.usern = false;
          this.username = undefined;
        }
      });
      // this.usersservice.getUser(this.userid)
      // .subscribe((user) => {
      //   if(user) {
      //     this.user_category = user.category;
      //   }
      //   else{
      //     console.log('Not defined');
      //   }
      // });
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
