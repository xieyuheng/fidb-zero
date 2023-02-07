import { expect, test } from "vitest"
import { serveTestDb } from "./serveTestDb"

test("serve-find", async () => {
  const { url, db } = await serveTestDb()

  expect(await (await fetch(`${url}`)).json()).toEqual({
    root: db.path,
    directory: "",
    directories: [],
  })

  await fetch(`${url}/users/1`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({}),
  })
  expect(await (await fetch(`${url}`)).json()).toEqual({
    root: db.path,
    directory: "",
    directories: ["users"],
  })

  await fetch(`${url}/users/2`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({}),
  })
  expect(await (await fetch(`${url}`)).json()).toEqual({
    root: db.path,
    directory: "",
    directories: ["users"],
  })

  await fetch(`${url}/posts/1`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({}),
  })
  expect(await (await fetch(`${url}`)).json()).toEqual({
    root: db.path,
    directory: "",
    directories: ["users", "posts"],
  })

  await fetch(`${url}/posts/2`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({}),
  })
  expect(await (await fetch(`${url}`)).json()).toEqual({
    root: db.path,
    directory: "",
    directories: ["users", "posts"],
  })

  await fetch(`${url}/users/tokens/1`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({}),
  })
  expect(await (await fetch(`${url}/users`)).json()).toEqual({
    root: db.path,
    directory: "users",
    directories: ["tokens"],
  })

  await fetch(`${url}/users/tokens/2`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({}),
  })
  expect(await (await fetch(`${url}/users`)).json()).toEqual({
    root: db.path,
    directory: "users",
    directories: ["tokens"],
  })
})
