import { expect, test } from "vitest"
import * as Db from "../../db"
import { prepareTestDb } from "./prepareTestDb"

test("db-create-put-delete", async ({ meta }) => {
  const db = await prepareTestDb(meta)

  const created = await Db.createData(db, "users/xieyuheng", {
    username: "xieyuheng",
    name: "Xie Yuheng",
  })

  expect(await Db.getData(db, "users/xieyuheng")).toEqual(created)

  const putted = await Db.putData(db, created["@path"], {
    ...created,
    username: "xieyuheng",
    name: "谢宇恒",
  })

  expect(await Db.getData(db, "users/xieyuheng")).toEqual(putted)

  await Db.deleteData(db, putted["@path"], putted)

  expect(await Db.getData(db, "users/xieyuheng"), undefined).toEqual(undefined)
})
