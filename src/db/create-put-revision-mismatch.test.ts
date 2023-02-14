import { expect, test } from "vitest"
import { randomRevision } from "../data"
import * as Db from "../db"
import { RevisionMismatch } from "../errors/RevisionMismatch"
import { prepareTestDb } from "./prepareTestDb"

test("create-put-revision-mismatch", async () => {
  const db = await prepareTestDb()

  const created = await Db.create(db, "users/xieyuheng", {
    username: "xieyuheng",
    name: "Xie Yuheng",
  })

  await expect(
    Db.put(db, {
      ...created,
      "@revision": randomRevision(),
    }),
  ).rejects.toThrowError(RevisionMismatch)
})
