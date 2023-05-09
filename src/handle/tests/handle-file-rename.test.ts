import { expect, test } from "vitest"
import { prepareTestServer } from "./prepareTestServer"

test("handle-file-rename", async ({ meta }) => {
  const { url, authorization } = await prepareTestServer(meta)

  await fetch(new URL(`users/xieyuheng/human.txt?kind=file`, url), {
    method: "POST",
    headers: {
      authorization,
      "content-type": "text/plain",
    },
    body: new TextEncoder().encode("Hello, I am Xie Yuheng."),
  })

  const response = await fetch(
    new URL(`users/xieyuheng/human.txt?kind=file-metadata`, url),
    {
      method: "GET",
      headers: {
        authorization,
      },
    },
  )

  const fileMetadata = await response.json()

  await fetch(new URL(`users/xieyuheng/human.txt?kind=file-rename`, url), {
    method: "POST",
    headers: {
      authorization,
    },
    body: JSON.stringify({
      to: "users/xieyuheng/robot.txt",
    }),
  })

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

    expect(response.status).toEqual(404)
  }

  {
    const response = await fetch(
      new URL(`users/xieyuheng/robot.txt?kind=file`, url),
      {
        method: "GET",
        headers: {
          authorization,
        },
      },
    )

    expect(response.status).toEqual(200)
  }

  {
    const response = await fetch(
      new URL(`users/xieyuheng/robot.txt?kind=file-metadata`, url),
      {
        method: "GET",
        headers: {
          authorization,
        },
      },
    )

    const newFileMetadata = await response.json()

    expect(newFileMetadata.updatedAt > fileMetadata.updatedAt).toEqual(true)
    expect(newFileMetadata.createdAt === fileMetadata.createdAt).toEqual(true)
    expect(newFileMetadata.size === fileMetadata.size).toEqual(true)
  }
})
