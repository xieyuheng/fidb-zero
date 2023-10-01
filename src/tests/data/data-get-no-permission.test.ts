import { expect, test } from "vitest"
import { api } from "../.."
import { allOperations } from "../../models/permission"
import { loginTokenCreate } from "../../system-resources/token"
import { tokenIssuerCreate } from "../../system-resources/token-issuer"
import { prepareTestServer } from "../prepareTestServer"

test("data-get-no-permission", async ({ task }) => {
  const { ctx, db } = await prepareTestServer(task)

  await tokenIssuerCreate(db, "users/xieyuheng", {
    permissions: {
      "users/xieyuheng/**": allOperations,
    },
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

  await tokenIssuerCreate(db, "users/xyh", {
    permissions: {
      "users/xyh/**": allOperations,
    },
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
