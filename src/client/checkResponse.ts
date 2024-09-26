import { type ClientContext } from "./ClientContext.js"
import { ClientError } from "./ClientError.js"

export function checkResponse(ctx: ClientContext, response: Response): void {
  if (!response.ok) {
    throw new ClientError(ctx, response.status, response.statusText)
  }
}
