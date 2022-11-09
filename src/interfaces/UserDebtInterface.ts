export interface UserDebtInterface {
          _id: string,
          assignedTo: {
                    _id: string,
                    firstName: string,
                    lastName: string
          },
          contributionId: null,
          amount: number,
          payIn: number,
          percentage: number,
          monthlyRestrain: number,
          hasPayed: boolean,
          description?: string,
          statusId: {
                    _id: string,
                    title: string,
                    code: string
          },
          createdAt: string,
          updatedAt: string,
}