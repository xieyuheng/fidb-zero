import { expect, test } from "vitest"
import { dataCreate } from "../../db"
import { allOperations, readOperations } from "../../permission"
import { tokenCreate } from "../../token"
import { prepareTestServer } from "./prepareTestServer"

test("handle-data-post-no-permission", async ({ meta }) => {
  const { url, db } = await prepareTestServer(meta)

  await dataCreate(db, "users/xyh/.login", {
    permissions: {
      "users/*/**": readOperations,
      "users/xyh/**": allOperations,
    },
  })

  const tokenName = await tokenCreate(db, {
    issuer: "users/xyh/.login",
  })

  const authorization = `token ${tokenName}`

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
