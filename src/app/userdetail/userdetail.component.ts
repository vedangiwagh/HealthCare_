import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { User } from '../shared/user';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {

  user: User;
  user_category: string;
  constructor(private route: ActivatedRoute,
    private authService: AuthService,
    private location: Location,
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
      }
      });
    this.route.params.pipe(switchMap((params: Params) => this.usersservice.getUser(params['id'])))
    .subscribe(user => {
      this.user = user;
    })
  }

}
