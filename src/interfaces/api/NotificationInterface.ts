import { UserProfileCodes } from "../../enum/userProfileCodes.enum"
export interface NotificationInterface {
          fromUserId: {
                    _id: string,
                    firstName: string,
                    lastName: string,
                    image?: string
          },
          toUserId: string,
          title: string,
          body: string,
          notifcationType: string
          _id: string,
          createdAt: string,
          updatedAt: string
}