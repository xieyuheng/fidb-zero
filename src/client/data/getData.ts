import { Data } from "../../database"
import { ClientContext } from "../ClientContext"
import { checkResponse } from "../checkResponse"

export async function getData(
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
