export enum DebtStatusCodes {
          /**
           * Indicate that the debt has been requested by the user
           */
          PEDDING = "PEDDING",
          /**
           * Indicates that the debt has been accepeted by the admin
           */
          ACCEPTED = "ACCEPTED",
          /**
           * Indicates that the debt has been rejected the by admin
           */
          CANCELLED = "CANCELLED",
          /**
           * Indicates that the debt has been accepted and then the money was given
           */
          GIVEN = "GIVEN",
          /**
           * Indicates that the debt has successfully finished
           */
          SETTLED = "SETTLED"
}