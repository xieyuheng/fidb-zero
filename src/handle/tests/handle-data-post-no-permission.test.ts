import { expect, test } from "vitest"
import { allOperations, readOperations } from "../../operation"
import { tokenCreate } from "../../token"
import { prepareTestServer } from "./prepareTestServer"

test("handle-data-post-no-permission", async ({ meta }) => {
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
