export interface DebtHistory {
          _id: string,
          contributionId: string,
          debtId: string,
          month: number,
          createdAt: string,
          updatedAt: string
}
export interface UserDebtInterface {
          _id: string,
          assignedTo: {
                    _id: string,
                    firstName: string,
                    lastName: string,
                    image?: string | null,
                    email: string
          },
          contributionId: null,
          amount: number,
          payIn: number,
          percentage: number,
          monthlyRestrain: number,
          hasPayed: boolean,
          description?: string,
          issueDate: string,
          statusId: {
                    _id: string,
                    title: string,
                    code: string
          },
          createdAt: string,
          updatedAt: string,
          histories?: DebtHistory[]
}