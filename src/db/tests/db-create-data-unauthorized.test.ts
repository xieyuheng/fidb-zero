import { expect, test } from "vitest"
import * as Db from "../../db"
import { Unauthorized } from "../../errors/Unauthorized"
import { prepareTestDb } from "./prepareTestDb"

test("db-create-data-unauthorized", async ({ meta }) => {
  const db = await prepareTestDb(meta)

  await expect(
    Db.createData(db, `../users/${crypto.randomUUID()}`, {
      username: "xieyuheng",
      name: "Xie Yuheng",
    }),
  ).rejects.toThrowError(Unauthorized)
})
