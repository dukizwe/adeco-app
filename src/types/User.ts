export interface User {
          firstName?: string,
          lastName?: string,
          _id: string,
          actions?: {
                    action?: number,
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