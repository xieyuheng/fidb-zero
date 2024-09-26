import { expect, test } from "vitest"
import { api } from "../../index.js"
import { prepareTestServer } from "../prepareTestServer.js"

test("info", async ({ task }) => {
  const { db, ctx } = await prepareTestServer(task)

  const name = "info"
  const description = "info"

  db.config = { name, description }

  expect(await api.info(ctx)).toEqual({
    name,
    description,
  })
})
