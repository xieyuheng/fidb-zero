import { expect, test } from "vitest"
import * as Db from "../../db"
import { Unauthorized } from "../../errors/Unauthorized"
import { prepareTestDb } from "./prepareTestDb"

test("db-delete-directory-unauthorized", async ({ meta }) => {
  const { db } = await prepareTestDb(meta)

  await expect(Db.deleteDirectory(db, "..")).rejects.toThrowError(Unauthorized)
})
