import { expect, test } from "vitest"
import { prepareTestServer } from "./prepareTestServer"

test("server-file", async () => {
  const { url, authorization } = await prepareTestServer()

  const created = await (
    await fetch(`${url}/users/xieyuheng`, {
      method: "POST",
      headers: {
        authorization,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: "xieyuheng",
        name: "Xie Yuheng",
      }),
    })
  ).json()

  expect(created.name).toEqual("Xie Yuheng")
  expect(
    await (
      await fetch(`${url}/users/xieyuheng`, {
        method: "GET",
        headers: {
          authorization,
        },
      })
    ).json(),
  ).toEqual(created)

  const putted = await (
    await fetch(`${url}/users/xieyuheng`, {
      method: "PUT",
      headers: {
        authorization,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        "@revision": created["@revision"],
        name: "谢宇恒",
      }),
    })
  ).json()

  expect(putted.username).toEqual(undefined)
  expect(putted.name).toEqual("谢宇恒")
  expect(
    await (
      await fetch(`${url}/users/xieyuheng`, {
        method: "GET",
        headers: {
          authorization,
        },
      })
    ).json(),
  ).toEqual(putted)

  const patched = await (
    await fetch(`${url}/users/xieyuheng`, {
      method: "PATCH",
      headers: {
        authorization,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        "@revision": putted["@revision"],
        username: "xyh",
      }),
    })
  ).json()

  expect(patched.username).toEqual("xyh")
  expect(patched.name).toEqual("谢宇恒")
  expect(
    await (
      await fetch(`${url}/users/xieyuheng`, {
        method: "GET",
        headers: {
          authorization,
        },
      })
    ).json(),
  ).toEqual(patched)

  await fetch(`${url}/users/xieyuheng`, {
    method: "DELETE",
    headers: {
      authorization,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      "@revision": patched["@revision"],
    }),
  })

  expect(
    (
      await fetch(`${url}/users/xieyuheng`, {
        method: "GET",
        headers: {
          authorization,
        },
      })
    ).status,
  ).toEqual(404)
})
