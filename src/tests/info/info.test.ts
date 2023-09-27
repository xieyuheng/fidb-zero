import { expect, test } from "vitest"
import { prepareTestServer } from "../prepareTestServer"

test("info", async ({ task }) => {
  const { url, db } = await prepareTestServer(task)

  const name = "info"
  const description = "info"
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
