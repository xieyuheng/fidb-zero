import { expect, test } from "vitest"
import { api } from "../../index.js"
import { allOperations, readOperations } from "../../models/permission/index.js"
import { groupCreate } from "../../system-resources/group/index.js"
import { loginTokenIssuerCreate } from "../../system-resources/token-issuer/index.js"
import { loginTokenCreate } from "../../system-resources/token/index.js"
import { prepareTestServer } from "../prepareTestServer.js"

test("data-post-no-permission", async ({ task }) => {
  const { ctx, db } = await prepareTestServer(task)

  await groupCreate(db, "xyh", {
    permissions: {
      "users/*/**": readOperations,
      "users/xyh/**": allOperations,
    },
  })

  await loginTokenIssuerCreate(db, "users/xyh", {
    groups: ["xyh"],
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
