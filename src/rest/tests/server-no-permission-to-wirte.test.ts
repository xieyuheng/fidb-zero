import { expect, test } from "vitest"
import * as Db from "../../db"
import { prepareTestServer } from "./prepareTestServer"

test("server-no-permission-to-write", async ({ meta }) => {
  const { url, db } = await prepareTestServer(meta)

  let authorization = `token ${await Db.createToken(db, {
    permissions: {
      "users/*": "readonly",
      "users/xieyuheng/**": "readwrite",
    },
  })}`

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

  authorization = `token ${await Db.createToken(db, {
    permissions: {
      "users/*": "readonly",
      "users/xyh/**": "readwrite",
    },
  })}`

  // read is ok.

  expect(
    (
      await (
        await fetch(`${url}/users/xieyuheng`, {
          method: "GET",
          headers: {
            authorization,
          },
        })
      ).json()
    ).username,
  ).toEqual("xieyuheng")

  // write is not ok

  expect(
    (
      await fetch(`${url}/users/xieyuheng`, {
        method: "PATCH",
        headers: {
          authorization,
        },
        body: JSON.stringify({
          "@revision": created["@revision"],
          name: "谢宇恒",
        }),
      })
    ).status,
  ).toEqual(401)

  // delete is like write

  expect(
    (
      await fetch(`${url}/users/xieyuheng`, {
        method: "DELETE",
        headers: {
          authorization,
        },
      })
    ).status,
  ).toEqual(401)
})
