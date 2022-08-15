import React from "react";
import type { User } from "./User";

export interface QueueRecord {
          [key: number]: User
}

export interface ContributionContextInterface {
          users: User[],
          inSelect: boolean,
          setInSelect: React.Dispatch<React.SetStateAction<boolean>>,
          selectedBatch: User[],
          setSelectedBatch: React.Dispatch<React.SetStateAction<User[]>>,
          isSelected: (user: User) => User | undefined,
          toggleSelectedBatch: (user: User) => void,
          queueList: QueueRecord;
          setQueueList: React.Dispatch<React.SetStateAction<QueueRecord>>,
          onUserLongPress: (user: User) => void,
          setStartAnimation: React.Dispatch<React.SetStateAction<boolean>>,
          startAnimation: boolean
}