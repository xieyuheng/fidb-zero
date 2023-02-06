import { expect, test } from "vitest"
import { serveTestDb } from "./serveTestDb"

test("serve-directory", async () => {
  const { url } = await serveTestDb()

  expect(await (await fetch(`${url}`)).json()).toEqual({
    directories: [],
  })

  await fetch(`${url}/users/1`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({}),
  })
  expect(await (await fetch(`${url}`)).json()).toEqual({
    directories: ["users"],
  })

  await fetch(`${url}/users/2`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({}),
  })
  expect(await (await fetch(`${url}`)).json()).toEqual({
    directories: ["users"],
  })

  await fetch(`${url}/posts/1`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({}),
  })
  expect(await (await fetch(`${url}`)).json()).toEqual({
    directories: ["users", "posts"],
  })

  await fetch(`${url}/posts/2`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({}),
  })
  expect(await (await fetch(`${url}`)).json()).toEqual({
    directories: ["users", "posts"],
  })

  await fetch(`${url}/users/tokens/1`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({}),
  })
  expect(await (await fetch(`${url}/users`)).json()).toEqual({
    directories: ["tokens"],
  })

  await fetch(`${url}/users/tokens/2`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({}),
  })
  expect(await (await fetch(`${url}/users`)).json()).toEqual({
    directories: ["tokens"],
  })
})
