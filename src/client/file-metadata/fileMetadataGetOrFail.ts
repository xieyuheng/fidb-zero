import { type FileMetadata } from "../../resources/index.js"
import { type ClientContext } from "../ClientContext.js"
import { checkResponse } from "../checkResponse.js"

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
