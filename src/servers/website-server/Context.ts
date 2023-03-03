import { resolve } from "node:path"
import { pathIsDirectory } from "../../utils/node/pathIsDirectory"

export type Context = {
  directory: string
  rewriteNotFoundTo?: string
}

type ContextOptions = {
  path: string
  rewriteNotFoundTo?: string
}

export async function createContext(options: ContextOptions): Promise<Context> {
  const { path, rewriteNotFoundTo } = options

  if (await pathIsDirectory(path)) {
    return {
      directory: resolve(path),
      rewriteNotFoundTo,
    }
  }

  throw new Error(`[createContext] path is a directory: ${path}`)
}
