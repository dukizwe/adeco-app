import { UserInterface } from "../../interfaces/api/UserInterface"
import { USER_ACTION_TYPES } from "../reducers/userReducer"

export const setUserAction = (user: UserInterface) => {
          return {
                    type: USER_ACTION_TYPES.SET_USER,
                    payload: user
          }
}
export const unsetUserAction = () => {
          return {
                    type: USER_ACTION_TYPES.UNSET_USER
          }
}