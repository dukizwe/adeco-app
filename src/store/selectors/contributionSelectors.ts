import { RootState } from "..";
import { Activity } from "../../types/Activity";
import { ContributionContextInterface, QueueRecord } from "../../types/ContributionContextInterface";
import { User } from "../../types/User";

export const usersSelector: ({ contribution }: RootState) => User[] = ({ contribution }: RootState) => contribution.users
export const inSelectSelector: ({ contribution }: RootState) => boolean = ({ contribution }: RootState) => contribution.inSelect
export const selectedBatchSelector: ({ contribution }: RootState) => User[] = ({ contribution }: RootState) => contribution.selectedBatch
export const queueListSelector: ({ contribution }: RootState) => QueueRecord  = ({ contribution }: RootState) => contribution.queueList
export const startAnimationSelector: ({ contribution }: RootState) => boolean = ({ contribution }: RootState) => contribution.startAnimation
export const queueActivitiesSelector: ({ contribution }: RootState) => Activity[] = ({ contribution }: RootState) => contribution.queueList.activities