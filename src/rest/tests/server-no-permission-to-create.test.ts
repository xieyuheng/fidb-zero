import { expect, test } from "vitest"
import * as Db from "../../db"
import { prepareTestServer } from "./prepareTestServer"

test("server-no-permission-to-create", async ({ meta }) => {
  const { url, db } = await prepareTestServer(meta)

  const authorization = `token ${await Db.createToken(db, {
    permissions: {
      "users/*/**": "readonly",
      "users/xyh/**": "readwrite",
    },
  })}`

  expect(
    (
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
    ).status,
  ).toEqual(401)
})
