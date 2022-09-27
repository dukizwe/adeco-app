import { ActivityCategoryInterface } from "./ActivityCategoryInterface";

export interface Activity {
          category: null | ActivityCategoryInterface,
          date: Date | string,
          amount: string,
          comment?: string
}