import { Data } from "../../database"
import { JsonObject } from "../../utils/Json"
import { ClientContext } from "../ClientContext"
import { checkResponse } from "../checkResponse"

export async function dataCreate(
  ctx: ClientContext,
  path: string,
  input: JsonObject,
): Promise<Data> {
  const response = await fetch(new URL(path, ctx.url), {
    method: "POST",
    headers: {
      authorization: ctx.authorization,
      "content-type": "application/json",
    },
    body: JSON.stringify(input),
  })

  checkResponse(ctx, response)

  return await response.json()
}
