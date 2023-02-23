import { expect, test } from "vitest"
import * as Db from "../../db"
import { Unauthorized } from "../../errors/Unauthorized"
import { arrayFromAsyncIterable } from "../../utils/arrayFromAsyncIterable"
import { prepareTestDb } from "./prepareTestDb"

test("db-unauthorized", async ({ meta }) => {
  const db = await prepareTestDb(meta)

  await expect(
    Db.createData(db, `../users/${crypto.randomUUID()}`, {
      username: "xieyuheng",
      name: "Xie Yuheng",
    }),
  ).rejects.toThrowError(Unauthorized)

  await expect(Db.deleteDirectory(db, "..")).rejects.toThrowError(Unauthorized)

  await expect(
    arrayFromAsyncIterable(Db.listAllDirectory(db, "..")),
  ).rejects.toThrowError(Unauthorized)
})
