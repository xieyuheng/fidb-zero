import { resolve } from "node:path"
import { pathIsDirectory } from "../../utils/node/pathIsDirectory"
import { pathIsFile } from "../../utils/node/pathIsFile"

export type Context = {
  kind: "File" | "Directory"
  path: string
}

type ContextOptions = {
  path: string
}

export async function createContext(options: ContextOptions): Promise<Context> {
  const { path } = options

  if (await pathIsFile(path)) {
    return {
      kind: "File",
      path: resolve(path),
    }
  }

  if (await pathIsDirectory(path)) {
    return {
      kind: "Directory",
      path: resolve(path),
    }
  }

  throw new Error(`[createContext] path is not a file or directory: ${path}`)
}
