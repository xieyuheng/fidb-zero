import { expect, test } from "vitest"
import { api } from "../../index"
import { allOperations, readOperations } from "../../permission"
import { loginTokenCreate } from "../../system-resources/login-token"
import { loginTokenIssuerCreate } from "../../system-resources/login-token-issuer"
import { prepareTestServer } from "../prepareTestServer"

test("data-patch-no-permission", async ({ task }) => {
  const { ctx, db } = await prepareTestServer(task)

  await loginTokenIssuerCreate(db, "users/xieyuheng", {
    permissions: {
      "users/*": readOperations,
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
      "users/*": readOperations,
      "users/xyh/**": allOperations,
    },
  })

  const tokenNameXYH = await loginTokenCreate(db, "users/xyh")
  authorization = `token ${tokenNameXYH}`

  newCtx.authorization = authorization

  // read is ok.

  expect((await api.dataGetOrFail(newCtx, `users/xieyuheng`)).username).toEqual(
    "xieyuheng",
  )

  // write is NOT ok.

  expect(
    (
      await fetch(new URL(`users/xieyuheng`, ctx.url), {
        method: "PATCH",
        headers: {
          authorization,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          "@revision": created["@revision"],
          name: "谢宇恒",
        }),
      })
    ).status,
  ).toEqual(401)

  // delete is like write, NOT ok.

  expect(
    (
      await fetch(new URL(`users/xieyuheng`, ctx.url), {
        method: "DELETE",
        headers: {
          authorization,
        },
      })
    ).status,
  ).toEqual(401)
})
