import { expect, test } from "vitest"
import * as Db from "../../db"
import { Unauthorized } from "../../errors/Unauthorized"
import { arrayFromAsyncIterable } from "../../utils/arrayFromAsyncIterable"
import { prepareTestDb } from "./prepareTestDb"

test("db-list-directory-all-unauthorized", async ({ meta }) => {
  const { db } = await prepareTestDb(meta)

  await expect(
    arrayFromAsyncIterable(Db.listDirectoryAll(db, "..")),
  ).rejects.toThrowError(Unauthorized)
})
