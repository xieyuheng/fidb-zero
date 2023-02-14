import { expect, test } from "vitest"
import * as Db from "../../db"
import { Unauthorized } from "../../errors/Unauthorized"
import { arrayFromAsyncIterable } from "../../utils/arrayFromAsyncIterable"
import { prepareTestDb } from "./prepareTestDb"

test("unauthorized", async ({ meta }) => {
  const db = await prepareTestDb(meta.name)

  await expect(
    Db.create(db, `../users/${crypto.randomUUID()}`, {
      username: "xieyuheng",
      name: "Xie Yuheng",
    }),
  ).rejects.toThrowError(Unauthorized)

  await expect(Db.deleteDirectory(db, "..")).rejects.toThrowError(Unauthorized)

  await expect(
    arrayFromAsyncIterable(Db.listDirectories(db, "..")),
  ).rejects.toThrowError(Unauthorized)
})
