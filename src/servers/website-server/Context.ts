import { pathIsDirectory } from "../../utils/node/pathIsDirectory"
import { pathIsFile } from "../../utils/node/pathIsFile"

export type Context = {
  kind: "File" | "Directory"
  path: string
}

export type ContextOptions = {
  path: string
}

export async function createContext(options: ContextOptions): Promise<Context> {
  const { path } = options

  if (await pathIsFile(path)) {
    return {
      kind: "File",
      path,
    }
  }

  if (await pathIsDirectory(path)) {
    return {
      kind: "Directory",
      path,
    }
  }

  throw new Error(`[createContext] path is not a file or directory: ${path}`)
}
