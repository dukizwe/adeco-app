import { ContributorInterface } from "../../interfaces/ContributorInterface"
import { RateTypeInterface } from "../../interfaces/RateTypeInterface"
import { Activity } from "../../types/Activity"
import { PastDebtInterface, QueueRecord } from "../../types/ContributionContextInterface"
import { ContributionInterface } from "../../interfaces/api/ContributionInterface"
import { QueuedUser } from "../../types/QueuedUser"
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

export const setActivitiesAction = (activities: Activity[]) => {
          return {
                    type: CONTRIBUTION_TYPES.SET_ACTIVITIES,
                    payload: activities
          }
}

export const appendActivityAction = (activity: Activity) => {
          return {
                    type: CONTRIBUTION_TYPES.APPEND_ACTIVITY,
                    payload: activity
          }
}

export const setPastDebtsAction = (pastDebts: PastDebtInterface[]) => {
          return {
                    type: CONTRIBUTION_TYPES.SET_PAST_DEBTS,
                    payload: pastDebts
          }
}

export const appendPastDebtAction = (pastDebt: PastDebtInterface) => {
          return {
                    type: CONTRIBUTION_TYPES.APPEND_PAST_DEBT,
                    payload: pastDebt
          }
}

export const setContributorsAction = (contributors: ContributorInterface[]) => {
          return {
                    type: CONTRIBUTION_TYPES.SET_CONTRIBUTORS,
                    payload: contributors
          }
}
export const setRateTypesAction = (rateTypes: RateTypeInterface[]) => {
          return {
                    type: CONTRIBUTION_TYPES.SET_RATE_TYPES,
                    payload: rateTypes
          }
}

export const setLastContribution = (contribution: ContributionInterface) => {
          return {
                    type: CONTRIBUTION_TYPES.SET_LAST_CONTRIBUTION,
                    payload: contribution
          }
}

export const resetNewContributionAcion = () => {
          return {
                    type: CONTRIBUTION_TYPES.RESET_NEW_CONTRIBUTION
          }
}