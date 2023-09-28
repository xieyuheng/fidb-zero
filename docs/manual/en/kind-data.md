---
title: kind=data
---

Firstly, the most basic four operations are the **CRUD**
-- **C**reate, **R**ead, **U**pdate and **D**elete.

- To **create** data, `POST` the path with the data.

  Note that, when JSON is used as HTTP request body,
  the `Content-Type` header should be `application/json`,
  this is the same for all HTTP APIs.

  For example, after the following `POST`s:

  ```
  POST users/xieyuheng

  { "name": "Xie Yuheng" }

  POST users/xieyuheng/projects/inner

  { "name": "inner", "description": "My inner universe." }

  POST users/xieyuheng/projects/pomodoro

  { "name": "Pomodoro", "description": "🍅 A Pomodoro timer." }
  ```

  We will create the following data files:

  ```
  users/xieyuheng/index.json
  users/xieyuheng/projects/inner/index.json
  users/xieyuheng/projects/pomodoro/index.json
  ```

- To **read** data, `GET` the path.

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

- To **update** the whole data, `PUT` the path with the data.

  We first need to read the data to get `@revision`.

  ```
  GET users/xieyuheng
  ```

  Result:

  ```
  {
    "name": "Xie Yuheng",
    "@path": "users/xieyuheng",
    "@revision": "1b0d4dc0b6e68853aa0005b03c059a47",
    "@createdAt": 1677377821957,
    "@updatedAt": 1679424624733,
  }
  ```

  Update the whole data:

  ```
  PUT users/xieyuheng

  {
    "name": "谢宇恒",
    "@path": "users/xieyuheng",
    "@revision": "1b0d4dc0b6e68853aa0005b03c059a47",
    "@createdAt": 1677377821957,
    "@updatedAt": 1679424624733
  }
  ```

- To **update** some properties of a data, `PATCH` the path with the data.

  We first need to read the data to get `@revision`.

  ```
  GET users/xieyuheng
  ```

  Result:

  ```
  {
    "name": "谢宇恒",
    "@path": "users/xieyuheng",
    "@revision": "2b983c7a51376a61747eb9d79da13c77",
    "@createdAt": 1677377821957,
    "@updatedAt": 1679424824733
  }
  ```

  Update only some properties:

  ```
  PATCH users/xieyuheng

  {
    "@revision": "2b983c7a51376a61747eb9d79da13c77",
    "country": "China"
  }
  ```

- To **delete** data, `DELETE` the path with the `@revision`.

  We first need to read the data to get `@revision`.

  ```
  GET users/xieyuheng
  ```

  Result:

  ```
  {
    "name": "谢宇恒",
    "country": "China",
    "@path": "users/xieyuheng",
    "@revision": "3f71a2d894180a2145ea7b05e2931e15",
    "@createdAt": 1677377821957,
    "@updatedAt": 1679425024733
  }
  ```

  Delete the data:

  ```
  DELETE users/xieyuheng

  {
    "@revision": "3f71a2d894180a2145ea7b05e2931e15"
  }
  ```
