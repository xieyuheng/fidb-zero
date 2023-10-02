import { FileMetadata } from "../../resources"
import { ClientContext } from "../ClientContext"
import { checkResponse } from "../checkResponse"

export async function fileMetadataGetOrFail(
  ctx: ClientContext,
  path: string,
): Promise<FileMetadata> {
  const response = await fetch(new URL(`${path}?kind=file-metadata`, ctx.url), {
    method: "GET",
    headers: {
      authorization: ctx.authorization,
    },
  })

  checkResponse(ctx, response)

  return response.json()
}
