import { expect, test } from "vitest"
import { serveTestDb } from "./serveTestDb"

test("serve", async () => {
  const { url } = await serveTestDb()

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
