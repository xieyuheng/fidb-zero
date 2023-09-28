import { ClientContext } from "./ClientContext"
import { ClientError } from "./ClientError"

export function checkResponse(ctx: ClientContext, response: Response): void {
  if (!response.ok) {
    throw new ClientError(ctx, response.status, response.statusText)
  }
}
