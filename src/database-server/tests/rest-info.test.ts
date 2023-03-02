import { expect, test } from "vitest"
import { prepareTestServer } from "./prepareTestServer"

test("rest-info", async ({ meta }) => {
  const { url, db } = await prepareTestServer(meta)

  db.config = {
    name: "rest-info",
    description: "Example config",
    authDirectories: {
      users: {
        permissions: ["create", "read", "update", "delete"],
      },
    },
  }

  const info = await (
    await fetch(`${url}?kind=info`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
  ).json()

  expect(info).toEqual({
    config: db.config,
  })
})
