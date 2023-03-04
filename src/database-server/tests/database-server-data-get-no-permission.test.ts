import { expect, test } from "vitest"
import * as Db from "../../db"
import { prepareTestServer } from "./prepareTestServer"

test("database-server-data-get-no-permission", async ({ meta }) => {
  const { url, db } = await prepareTestServer(meta)

  let authorization = `token ${await Db.tokenCreate(db, {
    permissionRecord: {
      "users/xieyuheng/**": ["create", "read", "update", "delete"],
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

  authorization = `token ${await Db.tokenCreate(db, {
    permissionRecord: {
      "users/xyh/**": ["create", "read", "update", "delete"],
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
