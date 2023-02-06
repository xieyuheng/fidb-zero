import { expect, test } from "vitest"
import { prepareTestDb } from "../db/prepareTestDb"
import * as Rest from "../rest"
import { findPort } from "../utils/findPort"

test("serve", async () => {
  const db = await prepareTestDb()

  const hostname = "127.0.0.1"
  const port = await findPort(3000)
  await Rest.serve({ db, hostname, port })

  const url = `http://${hostname}:${port}`

  const created = await (
    await fetch(`${url}/users/xieyuheng`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        username: "xieyuheng",
        name: "Xie Yuheng",
      }),
    })
  ).json()
  expect(created.name).toEqual("Xie Yuheng")
  expect(await (await fetch(`${url}/users/xieyuheng`)).json()).toEqual(created)

  const putted = await (
    await fetch(`${url}/users/xieyuheng`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        "@revision": created["@revision"],
        name: "谢宇恒",
      }),
    })
  ).json()
  expect(putted.username).toEqual(undefined)
  expect(putted.name).toEqual("谢宇恒")
  expect(await (await fetch(`${url}/users/xieyuheng`)).json()).toEqual(putted)

  const patched = await (
    await fetch(`${url}/users/xieyuheng`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        "@revision": putted["@revision"],
        username: "xyh",
      }),
    })
  ).json()
  expect(patched.username).toEqual("xyh")
  expect(patched.name).toEqual("谢宇恒")
  expect(await (await fetch(`${url}/users/xieyuheng`)).json()).toEqual(patched)

  await fetch(`${url}/users/xieyuheng`, {
    method: "DELETE",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      "@revision": patched["@revision"],
    }),
  })
  expect((await fetch(`${url}/users/xieyuheng`)).status).toEqual(404)
})
