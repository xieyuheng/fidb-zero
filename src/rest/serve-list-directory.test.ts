import { expect, test } from "vitest"
import { serveTestDb } from "./serveTestDb"

test("serve-list-directory", async () => {
  const { url, db } = await serveTestDb()

  expect((await (await fetch(`${url}`)).json()).root).toEqual(db.path)
  expect((await (await fetch(`${url}`)).json()).directory).toEqual("")
  expect((await (await fetch(`${url}`)).json()).directories.length).toEqual(0)

  await fetch(`${url}/users/1`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({}),
  })

  expect((await (await fetch(`${url}`)).json()).root).toEqual(db.path)
  expect((await (await fetch(`${url}`)).json()).directory).toEqual("")
  expect((await (await fetch(`${url}`)).json()).directories.length).toEqual(1)
  expect(
    (await (await fetch(`${url}`)).json()).directories.includes("users"),
  ).toEqual(true)

  await fetch(`${url}/users/2`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({}),
  })

  expect((await (await fetch(`${url}`)).json()).root).toEqual(db.path)
  expect((await (await fetch(`${url}`)).json()).directory).toEqual("")
  expect((await (await fetch(`${url}`)).json()).directories.length).toEqual(1)
  expect(
    (await (await fetch(`${url}`)).json()).directories.includes("users"),
  ).toEqual(true)

  await fetch(`${url}/posts/1`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({}),
  })

  expect((await (await fetch(`${url}`)).json()).root).toEqual(db.path)
  expect((await (await fetch(`${url}`)).json()).directory).toEqual("")
  expect((await (await fetch(`${url}`)).json()).directories.length).toEqual(2)
  expect(
    (await (await fetch(`${url}`)).json()).directories.includes("users"),
  ).toEqual(true)
  expect(
    (await (await fetch(`${url}`)).json()).directories.includes("posts"),
  ).toEqual(true)

  await fetch(`${url}/posts/2`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({}),
  })

  expect((await (await fetch(`${url}`)).json()).root).toEqual(db.path)
  expect((await (await fetch(`${url}`)).json()).directory).toEqual("")
  expect((await (await fetch(`${url}`)).json()).directories.length).toEqual(2)
  expect(
    (await (await fetch(`${url}`)).json()).directories.includes("users"),
  ).toEqual(true)
  expect(
    (await (await fetch(`${url}`)).json()).directories.includes("posts"),
  ).toEqual(true)

  await fetch(`${url}/users/tokens/1`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({}),
  })

  expect((await (await fetch(`${url}/users`)).json()).root).toEqual(db.path)
  expect((await (await fetch(`${url}/users`)).json()).directory).toEqual(
    "users",
  )
  expect(
    (await (await fetch(`${url}/users`)).json()).directories.length,
  ).toEqual(1)
  expect(
    (await (await fetch(`${url}/users`)).json()).directories.includes("tokens"),
  ).toEqual(true)

  await fetch(`${url}/users/tokens/2`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({}),
  })

  expect((await (await fetch(`${url}/users`)).json()).root).toEqual(db.path)
  expect((await (await fetch(`${url}/users`)).json()).directory).toEqual(
    "users",
  )
  expect(
    (await (await fetch(`${url}/users`)).json()).directories.length,
  ).toEqual(1)
  expect(
    (await (await fetch(`${url}/users`)).json()).directories.includes("tokens"),
  ).toEqual(true)
})
