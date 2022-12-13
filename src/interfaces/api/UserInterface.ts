import { UserProfileCodes } from "../../enum/userProfileCodes.enum"

export interface UserInterface {
          _id: string,
          email: string,
          firstName: string,
          lastName: string,
          verified: false,
          profileId: {
                    _id: string,
                    name: string,
                    code: UserProfileCodes
          },
          createdAt: string,
          image?: string,
          token: string
}