import { expect, test } from "vitest"
import { pathPatternMatch } from "./pathPatternMatch"

test("pathPatternMatch", async () => {
  expect(pathPatternMatch("users/{user}", "users/xieyuheng")).toEqual({
    user: "xieyuheng",
  })

  expect(pathPatternMatch("users/{user}/**", "users/xieyuheng")).toEqual({
    user: "xieyuheng",
  })

  expect(pathPatternMatch("users/{user}/*", "users/xieyuheng")).toEqual(
    undefined,
  )

  expect(
    pathPatternMatch(
      "users/{user}/projects/{user}",
      "users/xieyuheng/projects/xieyuheng",
    ),
  ).toEqual({
    user: "xieyuheng",
  })

  expect(
    pathPatternMatch(
      "users/{user}/projects/{user}",
      "users/xieyuheng/projects/cicada",
    ),
  ).toEqual(undefined)

  expect(
    pathPatternMatch(
      "users/{user}/projects/{project}",
      "users/xieyuheng/projects/cicada",
    ),
  ).toEqual({
    user: "xieyuheng",
    project: "cicada",
  })

  expect(
    pathPatternMatch(
      "users/{user}/*/{project}",
      "users/xieyuheng/projects/cicada",
    ),
  ).toEqual({
    user: "xieyuheng",
    project: "cicada",
  })

  expect(
    pathPatternMatch("users/{user}/**", "users/xieyuheng/projects/cicada"),
  ).toEqual({
    user: "xieyuheng",
  })

  expect(pathPatternMatch("users/{user}", "users/xieyuheng/config")).toEqual(
    undefined,
  )
})
