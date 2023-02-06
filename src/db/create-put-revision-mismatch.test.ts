import { expect, test } from "vitest"
import * as Db from "."
import { randomRevision } from "../data"
import { RevisionMismatch } from "./errors/RevisionMismatch"
import { prepareTest } from "./test-utils"

test("create-put-revision-mismatch", async () => {
  const { db } = await prepareTest()

  await Db.create(db, {
    "@id": "users/xieyuheng",
    username: "xieyuheng",
    name: "Xie Yuheng",
  })

  await expect(
    Db.put(db, {
      "@id": "users/xieyuheng",
      "@revision": randomRevision(),
      username: "xieyuheng",
      name: "Xie Yuheng",
    }),
  ).rejects.toThrowError(RevisionMismatch)
})
