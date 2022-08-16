export interface DebtFormInterface {
          amount: string,
          month: string,
          comment?: string,
}

export interface UserDebtFormInterface {
          [key: number]: DebtFormInterface
}

export type DataChanger = (name: keyof  DebtFormInterface, value: DebtFormInterface[typeof name]) => void