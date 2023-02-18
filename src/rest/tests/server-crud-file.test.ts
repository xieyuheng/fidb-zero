import { expect, test } from "vitest"
import { prepareTestServer } from "./prepareTestServer"

test("server-crud-file", async ({ meta }) => {
  const { url, authorization } = await prepareTestServer(meta)

  const response = await fetch(`${url}/users/xieyuheng/haha.txt?kind=file`, {
    method: "POST",
    headers: {
      authorization,
      "content-type": "text/plain",
    },
    body: new TextEncoder().encode("hahaha!"),
  })

  console.log(response.statusText)

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
