import process from "node:process"

export function readStdin(): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    process.stdin.on("data", (data) => {
      resolve(data)
    })

    process.stdin.on("error", (error) => {
      reject(error)
    })
  })
}
