import { expect, test } from "vitest"
import { api } from "../../index.js"
import { prepareTestServer } from "../prepareTestServer.js"

test("ping", async ({ task }) => {
  const { ctx } = await prepareTestServer(task)

  expect(await api.ping(ctx)).toEqual("pong")
})
