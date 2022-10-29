import React from "react";
import { ContributorInterface } from "../interfaces/ContributorInterface";
import { Activity } from "./Activity";
import type { User } from "./User";

export interface QueueRecord {
          date?: string,
          contributions: User[],
          activities?: Activity[]
}

export interface ContributionContextInterface {
          inSelect: boolean,
          // setInSelect: React.Dispatch<React.SetStateAction<boolean>>,
          selectedBatch: ContributorInterface[],
          // setSelectedBatch: React.Dispatch<React.SetStateAction<User[]>>,
          // isSelected: (user: User) => User | undefined,
          // toggleSelectedBatch: (user: User) => void,
          queueList: QueueRecord;
          // setQueueList: React.Dispatch<React.SetStateAction<QueueRecord>>,
          // onUserLongPress: (user: User) => void,
          // setStartAnimation: React.Dispatch<React.SetStateAction<boolean>>,
          startAnimation: boolean
}