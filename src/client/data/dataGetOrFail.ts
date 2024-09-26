import { type Data } from "../../database/index.js"
import { type ClientContext } from "../ClientContext.js"
import { checkResponse } from "../checkResponse.js"

export async function dataGetOrFail(
  ctx: ClientContext,
  path: string,
): Promise<Data> {
  const response = await fetch(new URL(path, ctx.url), {
    method: "GET",
    headers: {
      authorization: ctx.authorization,
    },
  })

  checkResponse(ctx, response)

  return await response.json()
}
