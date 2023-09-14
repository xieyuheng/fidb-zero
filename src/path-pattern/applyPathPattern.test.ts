import { expect, test } from "vitest"
import { applyPathPattern } from "./applyPathPattern"

test("applyPathPattern", async () => {
  expect(
    applyPathPattern("users/{user}", {
      user: "xieyuheng",
    }),
  ).toEqual("users/xieyuheng")

  expect(
    applyPathPattern("users/{user}/projects/{user}", {
      user: "xieyuheng",
    }),
  ).toEqual("users/xieyuheng/projects/xieyuheng")

  expect(
    applyPathPattern("users/{user}/projects/{project}", {
      user: "xieyuheng",
    }),
  ).toEqual("users/xieyuheng/projects/{project}")

  expect(
    applyPathPattern("users/{user}/projects/{project}", {
      user: "xieyuheng",
      project: "cicada",
    }),
  ).toEqual("users/xieyuheng/projects/cicada")
})
