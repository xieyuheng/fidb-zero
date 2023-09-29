import { expect, test } from "vitest"
import { api } from "../.."
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

  const newCtx = api.createClientContext(
    ctx.url,
    await loginTokenCreate(db, "users/xyh"),
  )

  const error = api.errorOrFail(() =>
    api.dataCreate(newCtx, `users/xieyuheng`, {
      username: "xieyuheng",
      name: "Xie Yuheng",
    }),
  )

  expect((await error).statusCode).toEqual(401)
})
