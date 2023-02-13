import { expect, test } from "vitest"
import { serveTestDb } from "./serveTestDb"

test("serve-create-directory", async () => {
  const { url, db } = await serveTestDb()

  expect((await (await fetch(`${url}`)).json()).directories.length).toEqual(0)

  await fetch(`${url}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      directory: "users",
    }),
  })

  expect((await (await fetch(`${url}`)).json()).directories.length).toEqual(1)
  expect(
    (await (await fetch(`${url}`)).json()).directories.includes("users"),
  ).toEqual(true)
})
