import { expect, test } from "vitest"
import * as Db from ".."
import { arrayFromAsyncIterable } from "../../utils/arrayFromAsyncIterable"
import { prepareTestDb } from "./prepareTestDb"

test("db-directory-list-with-file-metadata", async ({ meta }) => {
  const { db } = await prepareTestDb(meta)

  await Db.fileCreate(db, "contents/1.md", Buffer.from("hi"))
  await Db.fileCreate(db, "contents/2.md", Buffer.from("hello"))

  {
    const pathEntries = await arrayFromAsyncIterable(
      Db.directoryList(db, "contents", { page: 1, size: 10 }),
    )

    expect(pathEntries.length).toEqual(2)
    expect(
      Boolean(
        pathEntries.find(
          (entry) =>
            entry.kind === "File" &&
            entry.path === "contents/1.md" &&
            typeof entry.createdAt === "number" &&
            typeof entry.updatedAt === "number" &&
            entry.size === "hi".length,
        ),
      ),
    ).toEqual(true)
    expect(
      Boolean(
        pathEntries.find(
          (entry) =>
            entry.kind === "File" &&
            entry.path === "contents/2.md" &&
            typeof entry.createdAt === "number" &&
            typeof entry.updatedAt === "number" &&
            entry.size === "hello".length,
        ),
      ),
    ).toEqual(true)
  }
})
