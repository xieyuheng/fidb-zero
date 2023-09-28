import { Data } from "../../database"
import { ClientContext } from "../ClientContext"
import { checkResponse } from "../checkResponse"

export async function getDataOrFail(
  ctx: ClientContext,
  path: string,
): Promise<Data | undefined> {
  const response = await fetch(new URL(path, ctx.url), {
    method: "GET",
    headers: {
      authorization: ctx.authorization,
    },
  })

  checkResponse(ctx, response)

  return await response.json()
}
