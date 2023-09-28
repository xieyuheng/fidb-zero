import { expect, test } from "vitest"
import { api } from "../../index"
import { allOperations } from "../../permission"
import { createData } from "../../resources"
import { tokenCreate } from "../../token"
import { prepareTestServer } from "../prepareTestServer"

test("data-get-no-permission", async ({ task }) => {
  const { url, db } = await prepareTestServer(task)

  await createData(db, "users/xieyuheng/.login-token-issuer", {
    permissions: {
      "users/xieyuheng/**": allOperations,
    },
  })

  const tokenName = await tokenCreate(db, {
    issuer: "users/xieyuheng/.login-token-issuer",
  })

  let authorization = `token ${tokenName}`

  const ctx = { url, token: tokenName, authorization }

  const created = await api.createData(ctx, `users/xieyuheng`, {
    username: "xieyuheng",
    name: "Xie Yuheng",
  })

  expect(created.name).toEqual("Xie Yuheng")
  expect(await api.getData(ctx, `users/xieyuheng`)).toEqual(created)

  await createData(db, "users/xyh/.login-token-issuer", {
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
      await fetch(new URL(`users/xieyuheng`, url), {
        method: "GET",
        headers: {
          authorization,
        },
      })
    ).status,
  ).toEqual(401)
})
