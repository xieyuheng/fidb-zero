import { type ClientContext } from "../ClientContext.js"
import { checkResponse } from "../checkResponse.js"

export async function fileDelete(
  ctx: ClientContext,
  path: string,
): Promise<void> {
  const response = await fetch(new URL(`${path}?kind=file`, ctx.url), {
    method: "DELETE",
    headers: {
      authorization: ctx.authorization,
    },
  })

  checkResponse(ctx, response)
}
