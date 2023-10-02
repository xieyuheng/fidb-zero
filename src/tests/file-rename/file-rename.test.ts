import { expect, test } from "vitest"
import { api } from "../.."
import { prepareTestServer } from "../prepareTestServer"

test("file-rename", async ({ task }) => {
  const { ctx } = await prepareTestServer(task)

  const text = "Hello, I am Xie Yuheng."
  await api.fileCreate(ctx, `users/xieyuheng/human.txt`, text)

  const fileMetadata = await api.fileMetadataGetOrFail(
    ctx,
    `users/xieyuheng/human.txt`,
  )

  await api.fileRename(ctx, `users/xieyuheng/human.txt`, {
    to: "users/xieyuheng/robot.txt",
  })

  expect(await api.fileGet(ctx, `users/xieyuheng/human.txt`)).toEqual(undefined)
  expect(await api.fileGet(ctx, `users/xieyuheng/robot.txt`)).toEqual(
    new TextEncoder().encode(text),
  )

  {
    const newFileMetadata = await api.fileMetadataGetOrFail(
      ctx,
      `users/xieyuheng/robot.txt`,
    )

    expect(newFileMetadata.updatedAt > fileMetadata.updatedAt).toEqual(true)
    expect(newFileMetadata.createdAt === fileMetadata.createdAt).toEqual(true)
    expect(newFileMetadata.size === fileMetadata.size).toEqual(true)
  }
})
