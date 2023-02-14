import { expect, test } from "vitest"
import * as Db from "../db"
import { Unauthorized } from "../errors/Unauthorized"
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
})
