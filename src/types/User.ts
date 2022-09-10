export interface User {
          firstName?: string,
          lastName?: string,
          id: number,
          actions?: {
                    action: number,
                    rate?: number,
                    debt?: number,
                    both?: any
          },
          debt?: {
                    amount: number,
                    month: number,
                    comment?: string
          }
}