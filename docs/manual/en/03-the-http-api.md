---
title: The HTTP API
---

We follow [the standard](https://www.rfc-editor.org/rfc/rfc9110)
to organize our HTTP APIs by different kind of resources.

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
