---
title: kind=file
---

When no `kind` query parameter is given:

- `kind=data` will be the default if the path is a directory or does not exist.
- `kind=file` will be the default if the path is a file.

This kind of resource is not limited to JSON data files,
we can also use other kinds of files such as markdown, image, mp3 and so on.

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
