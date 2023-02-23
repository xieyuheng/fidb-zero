import { expect, test } from "vitest"
import { prepareTestServer } from "./prepareTestServer"

test("rest-password-auth", async ({ meta }) => {
  const { url } = await prepareTestServer(meta)

  expect // TODO
})
