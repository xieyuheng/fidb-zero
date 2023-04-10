import { expect, test } from "vitest"
import { pathPatternGenerate } from "./pathPatternGenerate"

test("pathPatternGenerate", async () => {
  expect(
    pathPatternGenerate("users/{user}", {
      user: "xieyuheng",
    }),
  ).toEqual("users/xieyuheng")

  expect(
    pathPatternGenerate("users/{user}/projects/{user}", {
      user: "xieyuheng",
    }),
  ).toEqual("users/xieyuheng/projects/xieyuheng")

  expect(
    pathPatternGenerate("users/{user}/projects/{project}", {
      user: "xieyuheng",
    }),
  ).toEqual("users/xieyuheng/projects/{project}")

  expect(
    pathPatternGenerate("users/{user}/projects/{project}", {
      user: "xieyuheng",
      project: "cicada",
    }),
  ).toEqual("users/xieyuheng/projects/cicada")
})
