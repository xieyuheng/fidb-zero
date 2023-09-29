import { expect, test } from "vitest"
import { createClientContext } from "../../client"
import { api } from "../../index"
import { prepareTestServer } from "../prepareTestServer"

test("password-register-and-login", async ({ task }) => {
  const { ctx } = await prepareTestServer(task)

  {
    const created = await api.passwordRegister(ctx, `users/xieyuheng`, {
      data: {
        username: "xieyuheng",
        name: "Xie Yuheng",
      },
      password: "123456",
    })

    expect(created.username).toEqual("xieyuheng")
    expect(created.name).toEqual("Xie Yuheng")
  }

  const { token } = await api.passwordLogin(ctx, `users/xieyuheng`, {
    password: "123456",
  })

  expect(typeof token).toEqual("string")

  let revision = ""
  const url = ctx.url

  {
    // The `token` can read user data.
    const ctx = createClientContext(url, token)
    const gotten = await api.dataGetOrFail(ctx, `users/xieyuheng`)
    expect(gotten.name).toEqual("Xie Yuheng")
    revision = gotten["@revision"]
  }

  {
    // The `token` can update user data.
    const ctx = createClientContext(url, token)
    const patched = await api.dataPatch(ctx, `users/xieyuheng`, {
      "@revision": revision,
      name: "谢宇恒",
    })
    expect(patched.name).toEqual("谢宇恒")
    revision = patched["@revision"]
  }
})
