 import { User } from "../user";

export interface UserState{

     user  : User ;
     isAdmin : boolean;
    
}

const initialState : UserState  =  {
    
    user : null,
    isAdmin : false
     
  }
 
export function userReducer(state : UserState = initialState, action) : UserState {
  
 
    debugger;
    
      console.log('existing state: ' + JSON.stringify(state))   
      console.log('payload: ' + action.payload)   
      switch (action.type) {
  
        case 'IS_AUTHENTICATED':
          return {
            ...state,
            isAdmin : action.payload
          };
    
        default:
          return state;
      }
    }