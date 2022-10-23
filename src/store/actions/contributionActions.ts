import { ContributorInterface } from "../../interfaces/ContributorInterface"
import { Activity } from "../../types/Activity"
import { QueueRecord } from "../../types/ContributionContextInterface"
import { User } from "../../types/User"
import { ContributionAction, CONTRIBUTION_TYPES } from "../reducers/contributionReducer"

export const setInSelectAction = (bool: boolean) => {
          return {
                   type: CONTRIBUTION_TYPES.SET_IN_SELECT,
                   payload: bool
          }
}
export const toggleInSelectAction = () => {
          return {
                   type: CONTRIBUTION_TYPES.TOGGLE_IN_SELECT
          }
}

export const setSelectedBatchAction = (users: ContributorInterface[]) => {
          return {
                   type: CONTRIBUTION_TYPES.SET_SELECTED_BATCH,
                   payload: users
          }
}

export const setQueueListAction = (queueList: QueueRecord) => {
          return {
                    type: CONTRIBUTION_TYPES.SET_QUEUE_LIST,
                    payload: queueList
          }
}

export const setStartAnimationAction = (bool: boolean) => {
          return {
                    type: CONTRIBUTION_TYPES.SET_START_ANIMATION,
                    payload: bool
          }
}

export const toggleStartAnimationAction = () => {
          return {
                    type: CONTRIBUTION_TYPES.TOGGLE_START_ANIMATION
          }
}

export const setPreviousTotalAction = (amount: number) => {
          return {
                    type: CONTRIBUTION_TYPES.SET_PREVIOUS_TOTAL,
                    payload: amount
          }
}

export const appendActivityAction = (activity: Activity) => {
          return {
                    type: CONTRIBUTION_TYPES.APPEND_ACTIVITY,
                    payload: activity
          }
}
