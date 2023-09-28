import qs from "qs"
import { DirectoryGetOptions } from "../../resources"
import { PathEntry } from "../../resources/directory/PathEntry"
import { ClientContext } from "../ClientContext"
import { checkResponse } from "../checkResponse"

export async function directoryGet(
  ctx: ClientContext,
  directory: string,
  options?: DirectoryGetOptions,
): Promise<Array<PathEntry>> {
  const query = qs.stringify(options)

  const response = await fetch(
    new URL(`${directory}?kind=directory&${query}`, ctx.url),
    {
      method: "GET",
      headers: {
        authorization: ctx.authorization,
      },
    },
  )

  checkResponse(ctx, response)

  return await response.json()
}
