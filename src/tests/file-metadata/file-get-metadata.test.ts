import { expect, test } from "vitest"
import { prepareTestServer } from "../prepareTestServer"

test("file-get-metadata", async ({ task }) => {
  const { url, authorization } = await prepareTestServer(task)

  await fetch(new URL(`users/xieyuheng/human.txt?kind=file`, url), {
    method: "POST",
    headers: {
      authorization,
      "content-type": "text/plain",
    },
    body: new TextEncoder().encode("Hello, I am Xie Yuheng."),
  })

  {
    const response = await fetch(
      new URL(`users/xieyuheng/human.txt?kind=file-metadata`, url),
      {
        method: "GET",
        headers: {
          authorization,
        },
      },
    )

    const json = await response.json()

    expect(json.size).toEqual("Hello, I am Xie Yuheng.".length)
    expect(typeof json.createdAt).toEqual("number")
    expect(typeof json.updatedAt).toEqual("number")
  }

  await fetch(new URL(`users/xieyuheng/human.txt?kind=file`, url), {
    method: "DELETE",
    headers: {
      authorization,
    },
  })

  {
    const response = await fetch(
      new URL(`users/xieyuheng/human.txt?kind=file-metadata`, url),
      {
        method: "GET",
        headers: {
          authorization,
        },
      },
    )

    expect(response.status).toEqual(404)
  }
})
