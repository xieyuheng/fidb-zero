export function randomRevision(): string {
  const array = new Uint8Array(10)
  crypto.getRandomValues(array)
  return array.join("")
}
