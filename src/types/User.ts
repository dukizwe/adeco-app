import { RateTypeInterface } from "../interfaces/RateTypeInterface"

export interface User {
          firstName?: string,
          lastName?: string,
          _id: string,
          actions?: {
                    action?: number,
                    rates?: RateTypeInterface[],
                    debt?: number,
                    both?: any
          },
          debt?: {
                    amount: number,
                    month: number,
                    comment?: string
          }
}