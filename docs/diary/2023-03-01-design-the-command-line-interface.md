---
title: Design the command line interface
author: Xie Yuheng
date: 2023-03-01
---

This has enough information, but is too long,
and it write password to terminal,
which will be save to terminal history,
thus not good.

```
fidb serve-database <directory> --port 5108 \
  --reverse-proxy-server https://fidb.app:5108 \
  --reverse-proxy-subdomain pomodoro \
  --reverse-proxy-username xieyuheng \
  --reverse-proxy-password abc


The database

  <directory> and database information

served at

  http://localhost:5108
  https://pomodoro.fidb.app:5108
```

Instead, we should first login to the reverse proxy server.

```
fidb login-reverse-proxy-server https://fidb.app:5108


Prompt for username

Prompt for password

On success, token saved to ~/.fidb/tokens/
```

Then in one line

```
fidb serve-database <directory> --port 5108
fidb serve-database <directory> --port 5108 --reverse-proxy https://pomodoro.fidb.app:5108


The database

  <directory> and database information

served at

  http://localhost:5108
  https://pomodoro.fidb.app:5108
```

```
fidb serve-website <directory> --port 8080
fidb serve-website <directory> --port 8080 --reverse-proxy https://pomodoro.fidb.app

Website served at

  http://localhost:8080
  https://pomodoro.fidb.app
```

About the reverse proxy server itself

```
fidb serve-reverse-proxy --port 5108 \
  --database <directory> \
  --tls-cert /etc/letsencrypt/live/fidb.app/fullchain.pem \
  --tls-key /etc/letsencrypt/live/fidb.app/privkey.pem


The reverse-proxy served at:

  https://127.0.0.1:5108
```
