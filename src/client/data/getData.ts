import { Data } from "../../database"
import { ClientContext } from "../ClientContext"

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

  return await response.json()
}
