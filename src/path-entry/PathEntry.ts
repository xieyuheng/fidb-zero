export type PathEntry = PathEntryFile | PathEntryDirectory

export type PathEntryFile = {
  kind: "File"
  path: string
  size: number
  createdAt: number
  updatedAt: number
}

export type PathEntryDirectory = {
  kind: "Directory"
  path: string
}
