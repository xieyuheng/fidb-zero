---
title: kind=file
---

当请求中没有写 `kind` 参数时：

- 如果请求的路径是一个文件夹，
  或者请求的路径还不存在，
  `kind=data` 会被作为默认参数。

- 如果请求的路径是一个文件，
  `kind=file` 会被作为默认参数。

文件这个类型的资源并不局限于 JSON 数据文件，
我们也可以用别的文件类型，比如 Markdown、图片、MP3 等等。

## POST {file}?kind=file

创建一个文件。

如果文件已经存在就报错。

例如：

```
POST users/xieyuheng/human.txt?kind=file

Hello, I am Xie Yuheng.
```

注意，对于纯文本文件，HTTP 的 `Content-Type` 头字段应该设置为 `text/plain`，
对于其他类型的文件，应该设置为 `application/octet-stream`。

其实 `Content-Type` 设置为什么并不紧要，
因为在读取文件的时候，
所返回的 HTTP `Content-Type` 头字段的值，
将由文件扩展名来决定。


## GET {file}?kind=file

读取一个文件。

例如，在上面的 POST 之后，我们可以用 GET 读取文件：

```
GET users/xieyuheng/human.txt?kind=file
```

由于文件扩展名是 `.txt`，
所以返回的 HTTP `Content-Type` 头字段的值是 `text/plain`。

## PUT {flie}?kind=file

更新一个文件。

PUT 是幂等的，如果文件已经存在，它就会更新文件，
如果文件还不存在，它就会创建文件。

例如：

```
PUT users/xieyuheng/human.txt?kind=file

Hello, I am Xie Yuheng from China.
```

## DELETE {flie}?kind=file


删除一个文件。

例如：

```
DELETE users/xieyuheng/human.txt?kind=file
```
