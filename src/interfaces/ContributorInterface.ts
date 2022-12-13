import { DebtHistory } from "./UserDebtInterface"

export interface ContributorInterface {
          _id: string,
          firstName: string,
          lastName: string,
          email: string,
          image?: string | null,
          profile: {
                    _id: string,
                    name: string,
                    code: string
          },
          debt?: {
                    _id: string,
                    assignedTo: string,
                    contributionId: string,
                    amount: number,
                    payIn: number,
                    percentage: number,
                    monthlyRestrain: number,
                    hasPayed: boolean,
                    statusId: string,
                    createdAt: string,
                    histories?: DebtHistory[]
          },
          contributionAmount: number
}