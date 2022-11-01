import { RootState } from "..";
import { ContributorInterface } from "../../interfaces/ContributorInterface";
import { RateTypeInterface } from "../../interfaces/RateTypeInterface";
import { Activity } from "../../types/Activity";
import { ContributionContextInterface, QueueRecord } from "../../types/ContributionContextInterface";
import { User } from "../../types/User";

export const usersSelector: ({ contribution }: RootState) => ContributorInterface[] = ({ contribution }: RootState) => contribution.contributors
export const contributorsSelector: ({ contribution }: RootState) => ContributorInterface[] = ({ contribution }: RootState) => contribution.contributors
export const rateTypesSelector: ({ contribution }: RootState) => RateTypeInterface[] = ({ contribution }: RootState) => contribution.rateTypes
export const inSelectSelector: ({ contribution }: RootState) => boolean = ({ contribution }: RootState) => contribution.inSelect
export const selectedBatchSelector: ({ contribution }: RootState) => ContributorInterface[] = ({ contribution }: RootState) => contribution.selectedBatch
export const queueListSelector: ({ contribution }: RootState) => QueueRecord  = ({ contribution }: RootState) => contribution.queueList
export const startAnimationSelector: ({ contribution }: RootState) => boolean = ({ contribution }: RootState) => contribution.startAnimation
export const queueActivitiesSelector: ({ contribution }: RootState) => Activity[] = ({ contribution }: RootState) => contribution.queueList.activities