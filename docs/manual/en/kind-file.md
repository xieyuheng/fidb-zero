---
title: kind=file
---

When no `kind` query parameter is given:

- `kind=data` will be the default if the path is a directory or does not exist.
- `kind=file` will be the default if the path is a file.

This kind of resource is not limited to JSON data files,
we can also use other kinds of files such as markdown, image, mp3 and so on.

# POST {file}?kind=file

Create a file.

If the file already exists,
error should be reported.

Note that, the `Content-Type` header should be `text/plain` for plaintext file,
and `application/octet-stream` for other kinds of file.

It actually does not matter what `Content-Type` is used here,
because when reading a file, the file extension is used
to determine the response `Content-Type` header.

For example:

```
POST users/xieyuheng/human.txt?kind=file

Hello, I am Xie Yuheng.
```

# GET {file}?kind=file

Read a file.

For example, after the POST above, we can read file by:

```
GET users/xieyuheng/human.txt?kind=file
```

The `Content-Type` of the HTTP response will be setted
based on the corresponding file extension,
for example, `.txt` maps to `text/plain`.

# PUT {flie}?kind=file

Update a file.

`PUT` is idempotent, if the file already exists, it will be updated,
if the file does not exist, it will be created.

For example:

```
PUT users/xieyuheng/human.txt?kind=file

Hello, I am Xie Yuheng from China.
```

# DELETE {flie}?kind=file


Delete a file.

For example:

```
DELETE users/xieyuheng/human.txt?kind=file
```
