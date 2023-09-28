import { expect, test } from "vitest"
import { api } from "../../index"
import { responseHeaders } from "../../utils/responseHeaders"
import { prepareTestServer } from "../prepareTestServer"

test("file-content-type", async ({ task }) => {
  const { url, authorization, ctx } = await prepareTestServer(task)

  const text = "Hello, I am Xie Yuheng."
  const bytes = new TextEncoder().encode(text)
  await api.fileCreate(ctx, `users/xieyuheng/human.txt`, bytes)

  {
    const response = await fetch(
      new URL(`users/xieyuheng/human.txt?kind=file`, url),
      {
        method: "GET",
        headers: {
          authorization,
        },
      },
    )

    const headers = responseHeaders(response)
    expect(headers["content-type"]).toEqual("text/plain")
  }
})
