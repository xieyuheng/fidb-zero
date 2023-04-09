import { expect, test } from "vitest"
import { tokenCreate } from "../../token"
import { allOperations, readOperations } from "../../token/Operation"
import { prepareTestServer } from "./prepareTestServer"

test("database-server-data-post-no-permission", async ({ meta }) => {
  const { url, db } = await prepareTestServer(meta)

  const authorization = `token ${await tokenCreate(db, {
    permissions: {
      "users/*/**": readOperations,
      "users/xyh/**": allOperations,
    },
  })}`

  expect(
    (
      await fetch(new URL(`users/xieyuheng`, url), {
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
