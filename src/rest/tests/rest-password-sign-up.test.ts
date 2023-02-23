import { expect, test } from "vitest"
import { prepareTestServer } from "./prepareTestServer"

test("rest-password-sign-up", async ({ meta }) => {
  const { url } = await prepareTestServer(meta)

  // const response = await fetch(`${url}/`)

  expect // TODO
})
