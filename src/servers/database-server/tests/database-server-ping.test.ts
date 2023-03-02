import { expect, test } from "vitest"
import { prepareTestServer } from "./prepareTestServer"

test("database-server-ping", async ({ meta }) => {
  const { url, db } = await prepareTestServer(meta)

  expect(
    await (
      await fetch(`${url}?kind=ping`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      })
    ).json(),
  ).toEqual("pong")
})
