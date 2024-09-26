import { expect, test } from "vitest"
import { api } from "../../index.js"
import { allOperations } from "../../models/permission/index.js"
import { groupCreate } from "../../system-resources/group/index.js"
import { loginTokenIssuerCreate } from "../../system-resources/token-issuer/index.js"
import { loginTokenCreate } from "../../system-resources/token/index.js"
import { prepareTestServer } from "../prepareTestServer.js"

test("data-get-no-permission", async ({ task }) => {
  const { ctx, db } = await prepareTestServer(task)

  await groupCreate(db, "xieyuheng", {
    permissions: {
      "users/xieyuheng/**": allOperations,
    },
  })

  await loginTokenIssuerCreate(db, "users/xieyuheng", {
    groups: ["xieyuheng"],
  })

  const newCtx = api.createClientContext(
    ctx.url,
    await loginTokenCreate(db, "users/xieyuheng"),
  )

  const created = await api.dataCreate(newCtx, `users/xieyuheng`, {
    username: "xieyuheng",
    name: "Xie Yuheng",
  })

  expect(created.name).toEqual("Xie Yuheng")
  expect(await api.dataGet(newCtx, `users/xieyuheng`)).toEqual(created)

  await groupCreate(db, "xyh", {
    permissions: {
      "users/xyh/**": allOperations,
    },
  })

  await loginTokenIssuerCreate(db, "users/xyh", {
    groups: ["xyh"],
  })

  const anotherCtx = api.createClientContext(
    ctx.url,
    await loginTokenCreate(db, "users/xyh"),
  )

  const error = await api.errorOrFail(() =>
    api.dataGet(anotherCtx, `users/xieyuheng`),
  )

  expect(error.statusCode).toEqual(401)
})
