import { expect, test } from "vitest"
import * as Db from "../db"
import { Unauthorized } from "../errors/Unauthorized"
import { arrayFromAsyncIterable } from "../utils/arrayFromAsyncIterable"
import { prepareTestDb } from "./prepareTestDb"

test("unauthorized", async () => {
  const db = await prepareTestDb()

  await expect(
    Db.create(db, {
      "@path": `../users/${crypto.randomUUID()}`,
      username: "xieyuheng",
      name: "Xie Yuheng",
    }),
  ).rejects.toThrowError(Unauthorized)

  await expect(Db.deleteDirectory(db, "..")).rejects.toThrowError(Unauthorized)
  await expect(
    arrayFromAsyncIterable(Db.listDirectories(db, "..")),
  ).rejects.toThrowError(Unauthorized)
})
