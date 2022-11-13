export interface ContributorInterface {
          _id: string,
          firstName: string,
          lastName: string,
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
                    createdAt: string
          },
          contributionAmount: number
}