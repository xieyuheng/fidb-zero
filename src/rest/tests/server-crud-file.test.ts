import { expect, test } from "vitest"
import { prepareTestServer } from "./prepareTestServer"

test("server-crud-file", async ({ meta }) => {
  const { url, authorization } = await prepareTestServer(meta)

  await fetch(`${url}/users/xieyuheng/haha.txt`, {
    method: "PUT",
    headers: {
      authorization,
      "content-type": "text/plain",
    },
    body: new TextEncoder().encode("hahaha!"),
  })

  expect(
    await (
      await fetch(`${url}/users/xieyuheng/haha.txt`, {
        method: "GET",
        headers: {
          authorization,
          "content-type": "text/plain",
        },
      })
    ).text(),
  ).toEqual("hahaha!")

  expect(
    new Uint8Array(
      await (
        await fetch(`${url}/users/xieyuheng/haha.txt`, {
          method: "GET",
          headers: {
            authorization,
            "content-type": "text/plain",
          },
        })
      ).arrayBuffer(),
    ),
  ).toEqual(new TextEncoder().encode("hahaha!"))
})
