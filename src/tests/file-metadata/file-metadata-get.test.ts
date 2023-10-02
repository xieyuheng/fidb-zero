import { expect, test } from "vitest"
import { api } from "../.."
import { prepareTestServer } from "../prepareTestServer"

test("file-metadata-get", async ({ task }) => {
  const { ctx } = await prepareTestServer(task)

  await api.fileCreate(
    ctx,
    `users/xieyuheng/human.txt`,
    "Hello, I am Xie Yuheng.",
  )

  {
    const metadata = await api.fileMetadataGetOrFail(
      ctx,
      `users/xieyuheng/human.txt`,
    )

    expect(metadata.size).toEqual("Hello, I am Xie Yuheng.".length)
    expect(typeof metadata.createdAt).toEqual("number")
    expect(typeof metadata.updatedAt).toEqual("number")
  }

  await api.fileDelete(ctx, `users/xieyuheng/human.txt`)

  {
    const metadata = await api.fileMetadataGet(ctx, `users/xieyuheng/human.txt`)
    expect(metadata).toEqual(undefined)
  }
})
