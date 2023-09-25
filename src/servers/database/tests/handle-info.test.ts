import { expect, test } from "vitest"
import { prepareTestServer } from "./prepareTestServer"

test("handle-info", async ({ meta }) => {
  const { url, db } = await prepareTestServer(meta)

  const name = "handle-info"
  const description = "handle-info"
  db.config = { name, description }

  const info = await (
    await fetch(new URL(`?kind=info`, url), {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
  ).json()

  expect(info).toEqual({
    name,
    description,
  })
})
