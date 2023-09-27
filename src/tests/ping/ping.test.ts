import { expect, test } from "vitest"
import { prepareTestServer } from "../prepareTestServer"

test("ping", async ({ meta }) => {
  const { url, db } = await prepareTestServer(meta)

  expect(
    await (
      await fetch(new URL(`?kind=ping`, url), {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      })
    ).json(),
  ).toEqual("pong")
})
