import { type Data } from "../../database/index.js"
import { type JsonObject } from "../../utils/Json.js"
import { type ClientContext } from "../ClientContext.js"
import { checkResponse } from "../checkResponse.js"

export async function dataPut(
  ctx: ClientContext,
  path: string,
  input: JsonObject,
): Promise<Data> {
  const response = await fetch(new URL(path, ctx.url), {
    method: "PUT",
    headers: {
      authorization: ctx.authorization,
      "content-type": "application/json",
    },
    body: JSON.stringify(input),
  })

  checkResponse(ctx, response)

  return await response.json()
}
