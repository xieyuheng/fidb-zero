---
title: The HTTP API
---

We want to use [HTTP API](https://www.rfc-editor.org/rfc/rfc9110) to operate data in FiDB.

The aim is to enable a developer to describe rules about HTTP API,
and let fidb dynamicly serves the HTTP API based on the rules,
thus a developer almost never need to write backend API code over database again.

We will do this little by little.

## Data Operations

Firstly, the most basic four operations is the **CRUD**
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

Beside basic CRUD operations,
we also want to do query in a data table,
specially we want to find data based on properties.
We use `kind=data-find` for this operation.

- To **find** data in a table based on some properties,
  `GET` the path of the table with query parameter `kind=data-find`
  and other query options in the query string.

  There might be many query results,
  thus we need to specify the page (starting from 1, default to 1)
  and the page size (default to 50).

  We use [`qs`](https://github.com/ljharb/qs) for parsing query string.

  For example, to get the first page of 3 user from China 🇨🇳,
  we can specify `country` in `properties`,
  and the query options should be:

  ```
  {
     page: 1,
     size: 3,
     properties: {
       country: "China",
     },
  }
  ```

  [`qs`](https://github.com/ljharb/qs) can parse the options from the following query string:

  ```
  GET /users?kind=data-find&page=1&size=3&properties[country]=China
  ```

  Query results:

  ```
  [
    {
      "name": "谢宇恒",
      "country": "China",
      "@path": "users/xieyuheng",
      "@revision": "4b987c7a58376a61747eb9d79da13c77",
      "@createdAt": 1677377821957,
      "@updatedAt": 1679424824733
    },
    ...
  ]
  ```

  We will talk about how to use indexes to make query more efficient
  in later chapters.

## File Operations

Since we are using file system as database,
beside operations on JSON data files,
we also want to operate on other kinds of files
such as markdown, image, mp3 and so on.

- **Problem 3.1:** How to distinguish kinds of resources referenced by a path?

- **Solution 3.1:** We can add `kind=...` query parameter to a request,
  where the value of `kind` explicitly denotes the kind of resource.

  For examples, value can be `data`, `file`, `directory` and so on.

  We require an implementation to view the value of `kind` as case insensitive,
  so a user can write both `kind=Data` and `kind=data`.

I feel good about this solution,
because it is scalable,
i.e. we can add as many kinds as we want in the future.

Now we are ready to specify the HTTP API about file operations.

- To **create** a file, `POST` the path with query parameter `kind=file` and the file content.

  Note that, when file is used as HTTP request body,
  the `Content-Type` header should be `text/plain` for plaintext file,
  and `application/octet-stream` for other kinds of file,
  It actually does not matter what `Content-Type` is used here,
  because when reading a file, the file extension is used
  to determine the response `Content-Type` header.

  For example:

  ```
  POST users/xieyuheng/human.txt?kind=file

  Hello, I am Xie Yuheng.
  ```

- To **read** a file, `GET` the path with query parameter `kind=file`.

  For example, after the POST above, we can read file by:

  ```
  GET users/xieyuheng/human.txt?kind=file
  ```

  The `Content-Type` of the HTTP response will be setted
  based on the corresponding file extension,
  for example, `.txt` maps to `text/plain`.

- To **update** a file, `PUT` the path with query parameter `kind=file` and the file content.

  For example:

  ```
  PUT users/xieyuheng/human.txt?kind=file

  Hello, I am Xie Yuheng from China.
  ```

- To **delete** a file, `DELETE` the path with query parameter `kind=file`.

  For example:

  ```
  DELETE users/xieyuheng/human.txt?kind=file
  ```

Now, all data operations require us to write `kind=data`,
and all file operations require us to write `kind=file`,
we can improve this situation a little bit.

- **Problem: 3.2** It is not convenient to always have to write
  `kind=data` and `kind=file`,
  specially we do not want to write `kind=file`
  when using web apps that dynamicly load content from URL
  -- like [readonly.link](https://readonly.link)
  and [mimor.app](https://mimor.app).

- **Solution: 3.2** We can identify some situations
  where it is unambiguous to omit `kind=...`.

  It is unambiguous to omit `kind=file`,
  if we are simply reading a file and the given `path`
  is to an existing file (instead of a directory).

  For `kind=data`, since it is the most used use case of our system,
  we view it as the default when `kind` is omitted,
  when the given `path` does not exist or the given path is to a directory.

Beside the file content,
we also want to read metadata of a file,
specially it's size.
We use `kind=file-metadata` as the `kind` parameter for this operation.

- To **read** a file's metadata, `GET` the path with query parameter `kind=file-metadata`.

  For example:

  ```
  GET users/xieyuheng/human.txt?kind=file-metadata
  ```

  The result could be:

  ```
  {
    size: 35,
    createdAt: 1680918204367,
    updatedAt: 1680918226860
  }
  ```

## Directory Operations

Since we are using file system as database,
and we can operate on files,
then we naturally also want to operate on directories.

- To **create** a directory, `POST` the path with query parameter `kind=directory`.

  For example:

  ```
  POST users?kind=directory
  ```

- To **read** a directory's direct subdirectories and subfiles,
  `GET` the path with query parameter `kind=directory`.

  For example:

  ```
  GET users?kind=directory
  ```

  Results:

  ```
  [
    { "kind": "Directory", "path": "users/xieyuheng" },
    { "kind": "Directory", "path": "users/readonlylink" },
    ...
  ]
  ```

  The `kind` can be `"Directory"` or `"File"`,
  the `path` is relative to the root of the database
  (thus can be used as primarily key).

- To **delete** a directory recursively,
  `DELETE` the path with query parameter `kind=directory`.

  For example:

  ```
  DELETE users?kind=directory
  ```
