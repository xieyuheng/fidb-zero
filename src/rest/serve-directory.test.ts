import { expect, test } from "vitest"
import { serveTestDb } from "./serveTestDb"

test("serve-directory", async () => {
  const { url } = await serveTestDb()

  expect(await (await fetch(`${url}`)).json()).toEqual([])

  await fetch(`${url}/users/1`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({}),
  })
  expect(await (await fetch(`${url}`)).json()).toEqual(["users"])

  await fetch(`${url}/users/2`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({}),
  })
  expect(await (await fetch(`${url}`)).json()).toEqual(["users"])

  await fetch(`${url}/posts/1`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({}),
  })
  expect(await (await fetch(`${url}`)).json()).toEqual(["users", "posts"])

  await fetch(`${url}/posts/2`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({}),
  })
  expect(await (await fetch(`${url}`)).json()).toEqual(["users", "posts"])
})
