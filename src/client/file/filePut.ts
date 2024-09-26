import { type ClientContext } from "../ClientContext.js"
import { checkResponse } from "../checkResponse.js"

export async function filePut(
  ctx: ClientContext,
  path: string,
  bytes: Uint8Array | string,
): Promise<undefined> {
  const response = await fetch(new URL(`${path}?kind=file`, ctx.url), {
    method: "PUT",
    headers: {
      authorization: ctx.authorization,
    },
    body: bytes,
  })

  checkResponse(ctx, response)
}
