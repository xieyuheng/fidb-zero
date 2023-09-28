---
title: kind=file
---

Since we are using file system as database,
beside operations on JSON data files,
we also want to operate on other kinds of files
such as markdown, image, mp3 and so on.

- **Problem 3.1:** File and data are both referenced by path,
  but they are two different kinds of resources.
  How to distinguish them?

- **Solution 3.1:** We can add `kind=...` query parameter to a request,
  where the value of `kind` explicitly denotes the kind of resource.

  For example, value can be `data`, `file`, `directory` and so on.

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

  If the file already exists, error should be reported.

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

  `PUT` is idempotent, if the file already exists, it will be updated,
  if the file does not exist, it will be created.

- To **delete** a file, `DELETE` the path with query parameter `kind=file`.

  For example:

  ```
  DELETE users/xieyuheng/human.txt?kind=file
  ```

Now, all data operations require us to write `kind=data`,
and all file operations require us to write `kind=file`,
we can improve this situation a little bit.

- **Problem: 3.2** It is not convenient to always have to write
  `kind=data` and `kind=file`.

- **Solution: 3.2** We can identify some situations
  where it is unambiguous to omit `kind=...`.

  It is unambiguous to omit `kind=file`,
  if we are simply reading a file and the given `path`
  is to an existing file (instead of a directory).

  For `kind=data`, since it is the most used use case of our system,
  when `kind` is omitted,
  and the given `path` does not exist
  or the given path is to a directory,
  we view it as `kind=data`.
