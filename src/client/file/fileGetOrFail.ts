import { type ClientContext } from "../ClientContext.js"
import { checkResponse } from "../checkResponse.js"

export async function fileGetOrFail(
  ctx: ClientContext,
  path: string,
): Promise<Uint8Array | undefined> {
  const response = await fetch(new URL(`${path}?kind=file`, ctx.url), {
    method: "GET",
    headers: {
      authorization: ctx.authorization,
    },
  })

  checkResponse(ctx, response)

  return new Uint8Array(await response.arrayBuffer())
}
