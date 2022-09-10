import { ContributionContextInterface } from "../../types/ContributionContextInterface"
import { User } from "../../types/User"

export enum CONTRIBUTION_TYPES {
          SET_IN_SELECT = "SET_IN_SELECT",
          TOGGLE_IN_SELECT = "TOGGLE_IN_SELECT",
          SET_SELECTED_BATCH = "SET_SELECTED_BATCH",
          SET_QUEUE_LIST = "SET_QUEUE_LIST",
          SET_START_ANIMATION = "SET_START_ANIMATION",
          TOGGLE_START_ANIMATION = "TOGGLE_START_ANIMATION",
}

export interface ContributionAction {
          type?: CONTRIBUTION_TYPES,
          payload?: any
}

const users: User[] = [
          {
                    firstName: 'Darcy',
                    lastName: 'Dukizwe',
                    id: 1,
                    actions: {
                              action: 6000,
                              rate: 2000,
                              debt: 60000
                    }
          },
          {
                    firstName: 'Darcy',
                    lastName: 'Dukizwe',
                    id: 2,
                    actions: {
                              action: 6000,
                              rate: 2000,
                              debt: 0
                    }
          },
          {
                    firstName: 'Darcy',
                    lastName: 'Dukizwe',
                    id: 3,
                    actions: {
                              action: 6000,
                              rate: 2000,
                              debt: 0
                    }
          },
          {
                    firstName: 'Darcy',
                    lastName: 'Dukizwe',
                    id: 4,
                    actions: {
                              action: 6000,
                              rate: 2000,
                              debt: 100000
                    }
          }
]

const initial: ContributionContextInterface = {
          users,
          inSelect: false,
          selectedBatch: [],
          queueList: {},
          startAnimation: false
}

export default function contributionReducer(contributionState: ContributionContextInterface = initial, action: ContributionAction) {
          switch (action.type) {
                    case CONTRIBUTION_TYPES.SET_IN_SELECT:
                              return {...contributionState, inSelect: action.payload}
                    case CONTRIBUTION_TYPES.TOGGLE_IN_SELECT:
                              return {...contributionState, inSelect: !contributionState.inSelect}
                    case CONTRIBUTION_TYPES.SET_SELECTED_BATCH:
                              return {...contributionState, selectedBatch: action.payload}
                    case CONTRIBUTION_TYPES.SET_QUEUE_LIST:
                              return {...contributionState, queueList: action.payload}
                    case CONTRIBUTION_TYPES.SET_START_ANIMATION:
                              return {...contributionState, startAnimation: action.payload}
                    case CONTRIBUTION_TYPES.TOGGLE_START_ANIMATION:
                              return {...contributionState, startAnimation: !contributionState.startAnimation}
                    default:
                              return contributionState
          }
}