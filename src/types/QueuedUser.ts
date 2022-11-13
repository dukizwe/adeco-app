import { RateTypeInterface } from "../interfaces/RateTypeInterface"

export interface QueuedUser {
          firstName?: string,
          lastName?: string,
          _id: string,
          actions?: {
                    action?: number,
                    rates?: RateTypeInterface[],
                    debt?: number,
                    payedDebt?: number,
                    both?: any
          }
}