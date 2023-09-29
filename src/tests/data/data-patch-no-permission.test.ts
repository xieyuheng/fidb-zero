import { expect, test } from "vitest"
import { api } from "../.."
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

  await loginTokenIssuerCreate(db, "users/xyh", {
    permissions: {
      "users/*": readOperations,
      "users/xyh/**": allOperations,
    },
  })

  const anotherCtx = api.createClientContext(
    ctx.url,
    await loginTokenCreate(db, "users/xyh"),
  )

  {
    // read is ok.

    const user = await api.dataGetOrFail(anotherCtx, `users/xieyuheng`)
    expect(user.username).toEqual("xieyuheng")
  }

  {
    // write is NOT ok.

    const error = await api.errorOrFail(() =>
      api.dataPatch(anotherCtx, `users/xieyuheng`, {
        "@revision": created["@revision"],
        name: "谢宇恒",
      }),
    )
    expect(error.statusCode).toEqual(401)
  }

  {
    // delete is like write, NOT ok.

    const error = await api.errorOrFail(() =>
      api.dataDelete(anotherCtx, `users/xieyuheng`, {
        "@revision": created["@revision"],
      }),
    )
    expect(error.statusCode).toEqual(401)
  }
})
