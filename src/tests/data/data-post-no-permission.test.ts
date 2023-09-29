import { expect, test } from "vitest"
import { allOperations, readOperations } from "../../permission"
import { loginTokenIssuerCreate } from "../../system-resources/login-token-issuer"
import { tokenCreate } from "../../system-resources/token"
import { prepareTestServer } from "../prepareTestServer"

test("data-post-no-permission", async ({ task }) => {
  const { ctx, db } = await prepareTestServer(task)

  await loginTokenIssuerCreate(db, "users/xyh", {
    permissions: {
      "users/*/**": readOperations,
      "users/xyh/**": allOperations,
    },
  })

  const tokenName = await tokenCreate(db, {
    issuer: "users/xyh/.login-token-issuer",
  })

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
