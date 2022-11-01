import { APP_TYPES } from "../reducers/appReducer"

export const setIsLoadingAction = (bool: boolean) => {
          return {
                    type: APP_TYPES.SET_LOADING,
                    payload: bool
          }
}