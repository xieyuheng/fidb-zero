import { expect, test } from "vitest"
import { api } from "../../index"
import { prepareTestServer } from "../prepareTestServer"

test("file-crud", async ({ task }) => {
  const { url, authorization, ctx } = await prepareTestServer(task)

  const text = "Hello, I am Xie Yuheng."
  const bytes = new TextEncoder().encode(text)
  await api.fileCreate(ctx, `users/xieyuheng/human.txt`, bytes)

  expect(await api.fileGet(ctx, `users/xieyuheng/human.txt`)).toEqual(bytes)

  {
    // NOTE `kind=file` is optional.

    const response = await fetch(new URL(`users/xieyuheng/human.txt`, url), {
      method: "GET",
      headers: {
        authorization,
      },
    })

    expect(await response.text()).toEqual(text)
  }

  {
    // const result = await api.try(() =>
    //   api.fileCreate(ctx, `users/xieyuheng/human.txt`, "hi!"),
    //                             )

    // expect(result.kind).toEqual("Error")

    // NOTE Post to existing file is not ok.

    const response = await fetch(
      new URL(`users/xieyuheng/human.txt?kind=file`, url),
      {
        method: "POST",
        headers: {
          authorization,
        },
        body: new TextEncoder().encode("Hello, I am Xie Yuheng from China."),
      },
    )

    expect(response.ok).toEqual(false)
    expect(response.status).toEqual(403)
  }

  const newText = "Hello, I am Xie Yuheng from China."
  const newBytes = new TextEncoder().encode(newText)
  await api.filePut(ctx, `users/xieyuheng/human.txt`, newBytes)

  expect(await api.fileGet(ctx, `users/xieyuheng/human.txt`)).toEqual(newBytes)

  await api.fileDelete(ctx, `users/xieyuheng/human.txt`)

  expect(await api.fileGet(ctx, `users/xieyuheng/human.txt`)).toEqual(undefined)
})
