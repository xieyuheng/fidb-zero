---
title: HTTP API
---

我们遵从 [HTTP 标准](https://www.rfc-editor.org/rfc/rfc9110)
将我们的 API 按照不同的资源来分门别类。
请求资源的时候，我们用 `kind` 参数来指明不同的资源类型。
`kind` 参数的值是不分大小写的，
比如写 `kind=Data` 或 `kind=data` 是一样的效果。

注意：

- 当 HTTP 请求带有 JSON 正文时，
  `Content-Type` 应该设置为 `application/json`。
  对于所有 HTTP API 都是如此。

- 当请求中没有写 `kind` 参数时：

  - 如果请求的路径是一个文件夹，
    或者请求的路径还不存在，
    `kind=data` 会被作为默认参数。

  - 如果请求的路径是一个文件，
    `kind=file` 会被作为默认参数。

目前我们有下列资源类型，之后还会继续增加。

- [kind=data](kind-data.md)

  ```
  POST   {data-path}?kind=data
  GET    {data-path}?kind=data
  PUT    {data-path}?kind=data
  PATCH  {data-path}?kind=data
  DELETE {data-path}?kind=data
  ```

- [kind=data-find](kind-data-find.md)

  ```
  GET    {data-directory}?kind=data-find
  ```

- [kind=file](kind-file.md)

  ```
  POST   {file}?kind=file
  GET    {file}?kind=file
  PUT    {flie}?kind=file
  DELETE {flie}?kind=file
  ```

- [kind=file-metadata](kind-file-metadata.md)

  ```
  GET    {flie}?kind=file-metadata
  ```

- [kind=file-rename](kind-file-rename.md)

  ```
  POST   {flie}?kind=file-rename
  ```

- [kind=directory](kind-directory.md)

  ```
  POST   {directory}?kind=directory
  GET    {directory}?kind=directory
  DELETE {directory}?kind=directory
  ```

- [kind=password-register](kind-password-register.md)

  ```
  POST   {data-file}?kind=password-register
  ```

- [kind=password-login](kind-password-login.md)

  ```
  POST   {data-file}?kind=password-login
  ```
