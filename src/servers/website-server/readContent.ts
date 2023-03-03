import type { Buffer } from "node:buffer"
import fs from "node:fs"
import { extname } from "node:path"
import { contentTypeRecord } from "../../utils/contentTypeRecord"
import { pathIsDirectory } from "../../utils/node/pathIsDirectory"
import { pathIsFile } from "../../utils/node/pathIsFile"

export async function readContent(path: string): Promise<
  | {
      type: string
      buffer: Buffer
    }
  | undefined
> {
  if (await pathIsDirectory(path)) {
    return {
      type: "text/html",
      buffer: await fs.promises.readFile(path + "/index.html"),
    }
  }

  if (await pathIsFile(path)) {
    return {
      type: contentTypeRecord[extname(path)] || "application/octet-stream",
      buffer: await fs.promises.readFile(path),
    }
  }
}
