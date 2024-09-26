import { type Data } from "../../database/index.js"
import { type ClientContext } from "../ClientContext.js"
import { checkResponse } from "../checkResponse.js"

export async function dataGet(
  ctx: ClientContext,
  path: string,
): Promise<Data | undefined> {
  const response = await fetch(new URL(path, ctx.url), {
    method: "GET",
    headers: {
      authorization: ctx.authorization,
    },
  })

  if (response.status === 404) {
    return undefined
  }

  checkResponse(ctx, response)

  return await response.json()
}
