import { expect, test } from "vitest"
import * as Db from "../../db"
import { prepareTestServer } from "./prepareTestServer"

test("server-no-permission-to-read", async ({ meta }) => {
  const { url, db } = await prepareTestServer(meta)

  let authorization = `token ${await Db.createToken(db, {
    permissions: {
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
      "users/xyh/**": "readwrite",
    },
  })}`

  expect(
    (
      await fetch(`${url}/users/xieyuheng`, {
        method: "GET",
        headers: {
          authorization,
        },
      })
    ).status,
  ).toEqual(401)
})
