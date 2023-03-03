export type Context = {
  kind: "File" | "Directory"
  path: string
}

export type ContextOptions = {
  path: string
}

export async function createContext(options: ContextOptions): Promise<Context> {
  const { path } = options

  return {
    kind: "File",
    path,
  }
}
