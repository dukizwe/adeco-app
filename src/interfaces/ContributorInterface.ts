export interface ContributorInterface {
          _id: string,
          firstName: string,
          lastName: string,
          profile: {
                    _id: string,
                    name: string,
                    code: string
          },
          debt?: {

          },
          contributionAmount: number
}