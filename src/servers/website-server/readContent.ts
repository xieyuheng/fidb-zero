import type { Buffer } from "node:buffer"
import fs from "node:fs"
import { extname } from "node:path"
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

const contentTypeRecord: Record<string, string> = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".markdown": "text/markdown",
  ".md": "text/markdown",

  ".txt": "text/plain",
  ".text": "text/plain",
  ".csv": "text/csv",

  ".json": "application/json",
  ".pdf": "application/pdf",
  ".zip": "application/zip",
  ".rar": "application/x-rar-compressed",

  ".mp2": "audio/mpeg",
  ".mp3": "audio/mpeg",
  ".m4a": "audio/mp4",
  ".wav": "audio/vnd.wav",
  ".ogg": "audio/ogg",

  ".mp4": "video/mp4",
  ".mpg": "video/mpeg",
  ".mpeg": "video/mpeg",
  ".mov": "video/quicktime",
  ".avi": "video/x-msvideo",

  ".ico": "image/vnd.microsoft.icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",

  ".woff": "font/woff",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
}
