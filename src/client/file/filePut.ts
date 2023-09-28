import { ClientContext } from "../ClientContext"
import { checkResponse } from "../checkResponse"

export async function filePut(
  ctx: ClientContext,
  path: string,
  bytes: Uint8Array,
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
