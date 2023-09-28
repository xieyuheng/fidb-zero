---
title: The HTTP API
---

We follow [the standard of HTTP](https://www.rfc-editor.org/rfc/rfc9110) to
organize our APIs by different kind of resources.  When doing a
request, we use the `kind` query parameter to say which kind of
resource we want.  The value of `kind` is case insensitive, so a user
can write both `kind=Data` and `kind=data`.

Notes:

- When JSON is used as HTTP request body,
  the `Content-Type` header should be `application/json`,
  this is the same for all HTTP APIs.

- When no `kind` query parameter is given:

  - `kind=data` will be the default if the path is a directory or does not exist.
  - `kind=file` will be the default if the path is a file.

Currently we have the follow kind of resources,
and we will add more in the future.

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
  PATCH  {flie}?kind=file
  DELETE {flie}?kind=file
  ```

- [kind=file-metadata](kind-file-metadata.md)

  ```
  GET    {flie}?kind=file-metadata
  ```

- [kind=directory](kind-directory.md)

  ```
  POST   {directory}?kind=directory
  GET    {directory}?kind=directory
  DELETE {directory}?kind=directory
  ```

- [kind=password-login](kind-password-login.md)

  ```
  POST   {data-file}?kind=password-login
  ```

- [kind=password-register](kind-password-register.md)

  ```
  POST   {data-file}?kind=password-register
  ```
