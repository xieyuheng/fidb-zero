---
title: The HTTP API
---

- **Problem:** We want to read and write data in fidb via HTTP API.

- **Solution:**

  ```
  users/xieyuheng/index.json
  users/xieyuheng/projects/inner/index.json
  users/xieyuheng/projects/pomodoro/index.json
  ```

  ```
  GET users/xieyuheng
  GET users/xieyuheng/projects/inner
  GET users/xieyuheng/projects/pomodoro
  ```

The aim is to enable a developer to describe rules about HTTP API declaratively,
thus almost never need to write backend API code over database anymore.
