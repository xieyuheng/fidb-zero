import { expect, test } from "vitest"
import { objectMergeProperties } from "./objectMergeProperties"

test("objectMergeProperties", () => {
  expect(
    objectMergeProperties(
      {
        x: 1,
        y: 2,
      },
      {
        x: 1,
      },
    ),
  ).toEqual({
    x: 1,
    y: 2,
  })

  expect(
    objectMergeProperties(
      {
        x: 1,
        y: 2,
      },
      {
        x: 2,
      },
    ),
  ).toEqual({
    x: 2,
    y: 2,
  })

  expect(
    objectMergeProperties(
      {
        x: { x: 1 },
        y: 2,
      },
      {
        x: { x: 1 },
      },
    ),
  ).toEqual({
    x: { x: 1 },
    y: 2,
  })

  expect(
    objectMergeProperties(
      {
        x: { x: 1 },
        y: 2,
      },
      {
        x: { x: 2 },
      },
    ),
  ).toEqual({
    x: { x: 2 },
    y: 2,
  })

  expect(
    objectMergeProperties(
      {
        x: { x: [1] },
        y: 2,
      },
      {
        x: { x: [1] },
      },
    ),
  ).toEqual({
    x: { x: [1] },
    y: 2,
  })

  expect(
    objectMergeProperties(
      {
        x: { x: [1] },
        y: 2,
      },
      {
        x: { x: [2] },
      },
    ),
  ).toEqual({
    x: { x: [2] },
    y: 2,
  })
})
