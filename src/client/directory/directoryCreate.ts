import { type ClientContext } from "../ClientContext.js"
import { checkResponse } from "../checkResponse.js"

export async function directoryCreate(
  ctx: ClientContext,
  directory: string,
): Promise<void> {
  const response = await fetch(
    new URL(`${directory}?kind=directory`, ctx.url),
    {
      method: "POST",
      headers: {
        authorization: ctx.authorization,
      },
    },
  )

  checkResponse(ctx, response)
}
