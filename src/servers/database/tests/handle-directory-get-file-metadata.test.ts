import { expect, test } from "vitest"
import type { PathEntry } from "../../../path-entry"
import { prepareTestServer } from "./prepareTestServer"

test("handle-directory-get-file-metadata", async ({ meta }) => {
  const { url, authorization } = await prepareTestServer(meta)

  await fetch(new URL(`contents/1.md?kind=file`, url), {
    method: "PUT",
    headers: {
      authorization,
      "content-type": "application/json",
    },
    body: "hi",
  })

  await fetch(new URL(`contents/2.md?kind=file`, url), {
    method: "PUT",
    headers: {
      authorization,
      "content-type": "application/json",
    },
    body: "hello",
  })

  {
    const response = await fetch(new URL(`contents/?kind=directory`, url), {
      method: "GET",
      headers: {
        authorization,
      },
    })
    const results = await response.json()
    expect(results.length).toEqual(2)
    expect(
      Boolean(
        results.find(
          (entry: PathEntry) =>
            entry.kind === "File" &&
            entry.path === "contents/1.md" &&
            typeof entry.createdAt === "number" &&
            typeof entry.updatedAt === "number" &&
            entry.size === "hi".length,
        ),
      ),
    ).toEqual(true)
    expect(
      Boolean(
        results.find(
          (entry: PathEntry) =>
            entry.kind === "File" &&
            entry.path === "contents/2.md" &&
            typeof entry.createdAt === "number" &&
            typeof entry.updatedAt === "number" &&
            entry.size === "hello".length,
        ),
      ),
    ).toEqual(true)
  }
})
