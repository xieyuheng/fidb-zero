---
title: kind=file-metadata
---

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
