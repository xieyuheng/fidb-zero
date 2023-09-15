import { expect, test } from "vitest"
import { prepareTestServer } from "./prepareTestServer"

test("handle-info", async ({ meta }) => {
  const { url, db } = await prepareTestServer(meta)

  db.config = {
    name: "handle-info",
    description: "Example config",
  }

  const info = await (
    await fetch(new URL(`?kind=info`, url), {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
  ).json()

  expect(info).toEqual({
    db: {
      config: db.config,
    },
  })
})