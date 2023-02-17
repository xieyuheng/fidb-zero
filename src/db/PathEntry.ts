export type PathEntryKind = "File" | "Directory"

export type PathEntry = {
  kind: PathEntryKind
  path: string
}
