import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../user/auth.service';

import { Store, select, State } from '@ngrx/store';
import *  as fromUserState from '../user/state/user.reducer'
import * as fromRoot from  '../state/app.state'

@Component({
  selector: 'pm-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

   isAdmin :  boolean;

  pageTitle = 'Acme Product Management';

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  constructor(private store:  Store<fromRoot.State>,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.isAdmin = false;
  
    this.store.pipe(select(state=>state.ks_user)).subscribe(state=> {
      debugger;
      this.isAdmin = state.isAdmin;
    });

    //    this.store.pipe(select(state=>stat)).subscribe(product => {
    //   debugger;

    //   if (product) {

    //     this.displayCode = product.showProductCode
    //   }

    // })

  }

  logOut(): void {
    this.authService.logout();
    this.router.navigate(['/welcome']);
  }
}
