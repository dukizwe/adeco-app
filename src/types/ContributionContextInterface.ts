import React from "react";
import { ContributorInterface } from "../interfaces/ContributorInterface";
import { RateTypeInterface } from "../interfaces/RateTypeInterface";
import { UserDebtInterface } from "../interfaces/UserDebtInterface";
import { Activity } from "./Activity";
import type { User } from "./User";

export interface QueueRecord {
          date?: string,
          contributions: User[],
          activities?: Activity[],
          debts?: UserDebtInterface[]
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
          startAnimation: boolean
}