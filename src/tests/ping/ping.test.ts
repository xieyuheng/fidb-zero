import { expect, test } from "vitest"
import { api } from "../../index"
import { prepareTestServer } from "../prepareTestServer"

test("ping", async ({ task }) => {
  const { url, db, ctx } = await prepareTestServer(task)

  expect(await api.ping(ctx)).toEqual("pong")
})
