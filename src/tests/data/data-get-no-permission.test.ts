import { expect, test } from "vitest"
import { api } from "../../index"
import { allOperations } from "../../permission"
import { dataCreate } from "../../resources"
import { tokenCreate } from "../../system-resources/token"
import { prepareTestServer } from "../prepareTestServer"

test("data-get-no-permission", async ({ task }) => {
  const { ctx, db } = await prepareTestServer(task)

  await dataCreate(db, "users/xieyuheng/.login-token-issuer", {
    permissions: {
      "users/xieyuheng/**": allOperations,
    },
  })

  const tokenName = await tokenCreate(db, {
    issuer: "users/xieyuheng/.login-token-issuer",
  })

  let authorization = `token ${tokenName}`

  const newCtx = api.createClientContext(ctx.url, tokenName)

  const created = await api.dataCreate(newCtx, `users/xieyuheng`, {
    username: "xieyuheng",
    name: "Xie Yuheng",
  })

  expect(created.name).toEqual("Xie Yuheng")
  expect(await api.dataGet(newCtx, `users/xieyuheng`)).toEqual(created)

  await dataCreate(db, "users/xyh/.login-token-issuer", {
    permissions: {
      "users/xyh/**": allOperations,
    },
  })

  const tokenNameXYH = await tokenCreate(db, {
    issuer: "users/xyh/.login-token-issuer",
  })

  authorization = `token ${tokenNameXYH}`

  expect(
    (
      await fetch(new URL(`users/xieyuheng`, ctx.url), {
        method: "GET",
        headers: {
          authorization,
        },
      })
    ).status,
  ).toEqual(401)
})
