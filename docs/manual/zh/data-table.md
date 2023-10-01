---
title: 数据表
---

想要实现 FiDB 这个想法，
我们首先要回答一个问题，
如何处理数据表（data table）
这个人们所熟知的数据库中的概念？

- **问题：** 如何在文件系统中表示数据表？

- **方案 A：** 用一个文件夹来表示数据表，
  在其中保存 JSON 数据文件，
  每个 JSON 数据文件代表数据表中的一行数据。

  例如：

  ```
  users/xieyuheng.json
  users/readonlylink.json
  users/mimor.json
  ```

看起来这是最简单的方案，
但是我们并不能采纳这个方案，
因为我们需要用子目录关系来表示「有一个」关系和「有多个」关系，
然而文件是没有子目录的。

- **方案 B：** 用一个文件夹来表示数据表，
  在其中保存子文件夹，
  买个子文件夹有一个名为 `index.json` 的 JSON 数据文件，
  每个 JSON 数据文件代表数据表中的一行数据。

  例如：

  ```
  users/xieyuheng/index.json
  users/readonlylink/index.json
  users/mimor/index.json
  ```

  我们称 `users/xieyuheng/index.json` 为一个数据文件。

  称 `users/xieyuheng` 这个路径为这一行数据的主键，我们将用路径来引用数据文件。

  例如上面数据文件的主键为：

  ```
  users/xieyuheng
  users/readonlylink
  users/mimor
  ```

之前多次提到过要实现「有一个」关系和「有多个」关系，
现在来明确地解决以下这个问题。

- **问题：** 如何在文件系统中表示「有一个」关系和「有多个」关系？

- **方案：** 一个数据属于另一个数据，
  应该表示为一个子文件夹属于一个对应的文件夹。

  例如，一个用户有多个项目，
  因此每个用户有一个 `projects` 子文件夹。

  如果，代表用户的数据文件形如：

  ```
  users/{user}/index.json
  ```

  具体的用户数据文件例如：

  ```
  users/readonlylink/index.json
  users/xieyuheng/index.json
  ```

  那么，代表项目的数据文件形如：

  ```
  users/{user}/projects/{project}/index.json
  ```

  具体的项目数据文件例如：

  ```
  users/xieyuheng/projects/inner/index.json
  users/xieyuheng/projects/pomodoro/index.json
  users/readonlylink/projects/x-node/index.json
  users/readonlylink/projects/x-markdown/index.json
  ```

  又比如，一个用户有一个配置，
  因此每个用户有一个 `config` 子文件夹。

  代表配置的数据文件形如：

  ```
  users/{user}/config/index.json
  ```

  具体的配置数据文件例如：

  ```
  users/xieyuheng/config/index.json
  users/readonlylink/config/index.json
  ```
