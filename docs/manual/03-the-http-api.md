---
title: The HTTP API
---

Let's go through the CRUD -- Create, Read, Update, and Delete.

- To **create** data, use `PUT` the path and the data.

  ```

  ```

- To **read** data, use `GET` and the path.

  For example, if we have the following data:

  ```
  users/xieyuheng/index.json
  users/xieyuheng/projects/inner/index.json
  users/xieyuheng/projects/pomodoro/index.json
  ```

  The `GET` requests would be:

  ```
  GET users/xieyuheng
  GET users/xieyuheng/projects/inner
  GET users/xieyuheng/projects/pomodoro
  ```

- To **update** some properties of a data, use `PATCH` the path and the data.

- To **update** the whole data, use `PUT` the path and the data.

TODO

The aim is to enable a developer to describe rules about HTTP API declaratively,
thus almost never need to write backend API code over database anymore.

TODO
