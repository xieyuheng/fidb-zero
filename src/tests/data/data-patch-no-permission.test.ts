import { expect, test } from "vitest"
import { api } from "../../index.js"
import { allOperations, readOperations } from "../../models/permission/index.js"
import { groupCreate } from "../../system-resources/group/index.js"
import { loginTokenIssuerCreate } from "../../system-resources/token-issuer/index.js"
import { loginTokenCreate } from "../../system-resources/token/index.js"
import { prepareTestServer } from "../prepareTestServer.js"

test("data-patch-no-permission", async ({ task }) => {
  const { ctx, db } = await prepareTestServer(task)

  await groupCreate(db, "xieyuheng", {
    permissions: {
      "users/xieyuheng/**": allOperations,
      "users/*": readOperations,
    },
  })

  await loginTokenIssuerCreate(db, "users/xieyuheng", {
    groups: ["xieyuheng"],
    user: "xieyuheng",
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
      "users/*": readOperations,
      "users/xyh/**": allOperations,
    },
  })

  await loginTokenIssuerCreate(db, "users/xyh", {
    groups: ["xyh"],
    user: "xyh",
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
