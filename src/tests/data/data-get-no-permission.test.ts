import { expect, test } from "vitest"
import { api } from "../../index"
import { allOperations } from "../../permission"
import { loginTokenCreate } from "../../system-resources/login-token"
import { loginTokenIssuerCreate } from "../../system-resources/login-token-issuer"
import { prepareTestServer } from "../prepareTestServer"

test("data-get-no-permission", async ({ task }) => {
  const { ctx, db } = await prepareTestServer(task)

  await loginTokenIssuerCreate(db, "users/xieyuheng", {
    permissions: {
      "users/xieyuheng/**": allOperations,
    },
  })

  const tokenName = await loginTokenCreate(db, "users/xieyuheng")
  let authorization = `token ${tokenName}`

  const newCtx = api.createClientContext(ctx.url, tokenName)
  const created = await api.dataCreate(newCtx, `users/xieyuheng`, {
    username: "xieyuheng",
    name: "Xie Yuheng",
  })

  expect(created.name).toEqual("Xie Yuheng")
  expect(await api.dataGet(newCtx, `users/xieyuheng`)).toEqual(created)

  await loginTokenIssuerCreate(db, "users/xyh", {
    permissions: {
      "users/xyh/**": allOperations,
    },
  })

  const tokenNameXYH = await loginTokenCreate(db, "users/xyh")
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
