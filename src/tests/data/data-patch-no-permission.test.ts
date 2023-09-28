import { expect, test } from "vitest"
import { api } from "../../index"
import { allOperations, readOperations } from "../../permission"
import { dataCreate } from "../../resources"
import { tokenCreate } from "../../token"
import { prepareTestServer } from "../prepareTestServer"

test("data-patch-no-permission", async ({ task }) => {
  const { url, db } = await prepareTestServer(task)

  await dataCreate(db, "users/xieyuheng/.login-token-issuer", {
    permissions: {
      "users/*": readOperations,
      "users/xieyuheng/**": allOperations,
    },
  })

  const tokenName = await tokenCreate(db, {
    issuer: "users/xieyuheng/.login-token-issuer",
  })

  let authorization = `token ${tokenName}`

  const ctx = api.createClientContext(url, tokenName)

  const created = await api.dataCreate(ctx, `users/xieyuheng`, {
    username: "xieyuheng",
    name: "Xie Yuheng",
  })

  expect(created.name).toEqual("Xie Yuheng")
  expect(await api.dataGet(ctx, `users/xieyuheng`)).toEqual(created)

  await dataCreate(db, "users/xyh/.login-token-issuer", {
    permissions: {
      "users/*": readOperations,
      "users/xyh/**": allOperations,
    },
  })

  const tokenNameXYH = await tokenCreate(db, {
    issuer: "users/xyh/.login-token-issuer",
  })

  authorization = `token ${tokenNameXYH}`

  ctx.authorization = authorization

  // read is ok.

  expect((await api.dataGetOrFail(ctx, `users/xieyuheng`)).username).toEqual(
    "xieyuheng",
  )

  // write is NOT ok.

  expect(
    (
      await fetch(new URL(`users/xieyuheng`, url), {
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
      await fetch(new URL(`users/xieyuheng`, url), {
        method: "DELETE",
        headers: {
          authorization,
        },
      })
    ).status,
  ).toEqual(401)
})
