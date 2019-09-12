import { Injectable } from '@angular/core';

import { User } from './user';

import {Store} from '@ngrx/store'
import * as  fromAppState  from '../state/app.state'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    currentUser: User | null;
    redirectUrl: string;

    constructor(public store: Store<fromAppState.State>) {  }

    isLoggedIn(): boolean {
        return !!this.currentUser;
    }

    login(userName: string, password: string): void {
        // Code here would log into a back end service
        // and return user information
        // This is just hard-coded here.
      debugger
        this.store.dispatch({
            type: 'IS_AUTHENTICATED',
            payload: true
           
          });
       
        this.currentUser = {
            id: 2,
            userName: userName,
            isAdmin: false
        };
    }

    logout(): void {
        this.currentUser = null;
    }
}
