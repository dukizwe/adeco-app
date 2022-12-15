import { APP_TYPES } from "../reducers/appReducer"
import * as Notifications from 'expo-notifications';

export const setIsLoadingAction = (bool: boolean) => {
          return {
                    type: APP_TYPES.SET_LOADING,
                    payload: bool
          }
}

export const setPushTokenAction = (token: string) => {
          return {
                    type: APP_TYPES.SET_PUSH_TOKEN,
                    payload: token
          }
}