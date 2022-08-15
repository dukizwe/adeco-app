export interface User {
          firstName?: string,
          lastName?: string,
          id: number,
          actions?: {
                    action: number,
                    rate?: number,
                    debt?: number
          },
          debt?: {
                    montant: number,
                    month: number,
                    comment?: string
          }
}