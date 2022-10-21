import { Code } from "../enum/code.enum"
import { Status } from "../enum/status.enum"

export type ApiResponse = {
          httpStatus: Status,
          statusCode: Code,
          message: string,
          data?: any
}