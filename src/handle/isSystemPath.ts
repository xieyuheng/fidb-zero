export function isSystemPath(path: string): boolean {
  const parts = path.split("/")
  return parts.some((part) => part.startsWith("."))
}
