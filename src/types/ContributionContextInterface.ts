import React from "react";
import { ContributionInterface } from "../interfaces/api/ContributionInterface";
import { ContributorInterface } from "../interfaces/ContributorInterface";
import { RateTypeInterface } from "../interfaces/RateTypeInterface";
import { UserDebtInterface } from "../interfaces/UserDebtInterface";
import { Activity } from "./Activity";
import type { QueuedUser } from "./QueuedUser";


export interface PastDebtInterface {
          _id: string,
          amount: number,
          date: string,
          comment: string
}
export interface QueueRecord {
          date?: string,
          contributions: QueuedUser[],
          activities?: Activity[],
          debts?: UserDebtInterface[],
          pastDebts: PastDebtInterface[]
}

export interface ContributionContextInterface {
          inSelect: boolean,
          // setInSelect: React.Dispatch<React.SetStateAction<boolean>>,
          selectedBatch: ContributorInterface[],
          contributors: ContributorInterface[],
          rateTypes: RateTypeInterface[],
          // setSelectedBatch: React.Dispatch<React.SetStateAction<User[]>>,
          // isSelected: (user: User) => User | undefined,
          // toggleSelectedBatch: (user: User) => void,
          queueList: QueueRecord;
          // setQueueList: React.Dispatch<React.SetStateAction<QueueRecord>>,
          // onUserLongPress: (user: User) => void,
          // setStartAnimation: React.Dispatch<React.SetStateAction<boolean>>,
          startAnimation: boolean,
          lastContribution?: ContributionInterface
}