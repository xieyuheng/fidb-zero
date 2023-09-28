import { ClientContext } from "../ClientContext"
import { checkResponse } from "../checkResponse"

export async function directoryDelete(
  ctx: ClientContext,
  directory: string,
): Promise<void> {
  const response = await fetch(
    new URL(`${directory}?kind=directory`, ctx.url),
    {
      method: "DELETE",
      headers: {
        authorization: ctx.authorization,
      },
    },
  )

  checkResponse(ctx, response)
}
