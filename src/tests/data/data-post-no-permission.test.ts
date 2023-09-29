import { expect, test } from "vitest"
import { allOperations, readOperations } from "../../permission"
import { loginTokenCreate } from "../../system-resources/login-token"
import { loginTokenIssuerCreate } from "../../system-resources/login-token-issuer"
import { prepareTestServer } from "../prepareTestServer"

test("data-post-no-permission", async ({ task }) => {
  const { ctx, db } = await prepareTestServer(task)

  await loginTokenIssuerCreate(db, "users/xyh", {
    permissions: {
      "users/*/**": readOperations,
      "users/xyh/**": allOperations,
    },
  })

  const tokenName = await loginTokenCreate(db, "users/xyh")
  const authorization = `token ${tokenName}`

  expect(
    (
      await fetch(new URL(`users/xieyuheng`, ctx.url), {
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
