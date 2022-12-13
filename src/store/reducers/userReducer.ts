import { UserInterface } from "../../interfaces/api/UserInterface"

export enum USER_ACTION_TYPES {
          SET_USER = "SET_USER",
          UNSET_USER = "UNSET_USER"
}

export interface UserAction {
          type?: USER_ACTION_TYPES,
          payload?: any
}

export default function userReducer(user: UserInterface | null = null, action : UserAction) {
          switch (action.type) {
                    case USER_ACTION_TYPES.SET_USER:
                              // action.payload && localStorage.setItem('user', JSON.stringify({...action.payload}))
                              return action.payload
                    case USER_ACTION_TYPES.UNSET_USER:
                              return null
          
                    default:
                              return user
          }
}