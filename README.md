# FiDB

This is a Node.js implementation of [**FiDB**](https://fidb.app)
-- a suite of protocols to use file system as database.


Including a command-line tool to initialize and maintain database.

```
fidb help [name]   Display help for a command
fidb init [path]   Initialize a directory to be a database
fidb serve [path]  Serve a database
```

And a HTTP server to generate REST API from a database.

```
POST   {data-path}?kind=data
GET    {data-path}?kind=data
PUT    {data-path}?kind=data
PATCH  {data-path}?kind=data
DELETE {data-path}?kind=data

GET    {data-directory}?kind=data-find

POST   {file}?kind=file
GET    {file}?kind=file
PUT    {flie}?kind=file
PATCH  {flie}?kind=file
DELETE {flie}?kind=file

GET    {flie}?kind=file-metadata

POST   {directory}?kind=directory
GET    {directory}?kind=directory
DELETE {directory}?kind=directory
```

## Ethos

The ethos of the FiDB project is the following "what if ...?"s.

> What if we use file system as database?

> What if we generate HTTP API from the database, <br>
> instead of writing trivial CRUD code over and over again?

> What if we write web apps in a way that a user can switch backend, <br>
> even using their local backend?

## Install

### Requirements

Node.js version must
be >= [20.1](https://nodejs.org/en/blog/release/v20.1.0)
or >= [18.17.0](https://nodejs.org/en/blog/release/v18.17.0).

- For the `recursive` option to `readdir` and `opendir`.

### Command line tool

Install it by the following command:

```sh
npm install -g fidb
```

The command line program is called `fidb`.

## Docs

- [Init a database](#init-a-database)
- [Serve one database](#serve-one-database)
- [Serve many databases](#serve-many-databases)
- [Login a user](#login-a-user)
- [Register a user](#register-a-user)
- [Config logger](#config-logger)
- [Get free certificate](#get-free-certificate)
- [Use systemd to start service](#use-systemd-to-start-service)

### Init a database

A database is just a directory of subdirectories and JSON data files,
with a `database.json` config file,
and with some more data files serve as
detailed system configurations.

Use the `fidb init` command to create a database:

```sh
fidb init hello-world
```

Example console output of `fidb init`:

```
13:58:26.119 [init] -- {"directory":"/tmp/hello-world"}
13:58:26.125 [initDatabaseConfigFile] -- {"file":"/tmp/hello-world/database.json"}
13:58:26.133 [initSystemResource] -- {"path":".config/default-token-issuer"}
13:58:26.134 [initSystemResource] -- {"path":".tokens/default"}
13:58:26.135 [initSystemResource] -- {"path":".config/password-register-strategy"}
13:58:26.201 [initExampleUser] -- {"path":"users/alice","password":"alice123"}
13:58:26.251 [initExampleUser] -- {"path":"users/bob","password":"bob456"}
```

Let's run `tree` to see what directories and files are created:

```

❯ tree -a hello-world/
hello-world/
├── .config
│   ├── default-token-issuer
│   │   └── index.json
│   └── password-register-strategy
│       └── index.json
├── database.json
├── .tokens
│   └── default
│       └── index.json
└── users
    ├── alice
    │   ├── index.json
    │   ├── .login-token-issuer
    │   │   └── index.json
    │   └── .password
    │       └── index.json
    └── bob
        ├── index.json
        ├── .login-token-issuer
        │   └── index.json
        └── .password
            └── index.json

13 directories, 10 files
```

## Serve one database

Use the `fidb serve` command to serve a database:

```sh
fidb serve hello-world
```

The default port of the server is `5108`, which looks like FiDB isn't it?

## Serve many databases

Use the `fidb serve-many` command
to serve many databases in one directory,
using subdomain-based routing.

For example, I have a VPS machine,
where I put all my databases
in the `/databases` directory.

```
/databases/x-wiki
/databases/x-news
...
```

I bought a domain for my server -- say `fidb.app`,
and configured my DNS to resolve `fidb.app`
and `*.fidb.app` to my server.

I also created certificate files for my domain using `certbot`.

- About how to use `certbot`, please see
  the ["Get free certificate"](#get-free-certificate) section.

I can use `fidb serve-many` command to serve all of
the databases in `/databases` directory.

```sh
fidb serve-many /databases/database.json
```

Where `/databases/database.json` is:

```json
{
  "server": {
    "hostname": "fidb.app",
    "port": 5108,
    "tls": {
      "cert": "/etc/letsencrypt/live/fidb.app/fullchain.pem",
      "key": "/etc/letsencrypt/live/fidb.app/privkey.pem"
    }
  }
}
```

- When using `fidb serve-many`,
  the `server.hostname` option is required.

- And each database in `/databases` might have
  it's own `database.json` config file.

Then I can access all my databases via subdomain of `fidb.app`.

```
https://x-wiki.fidb.app:5108
https://x-news.fidb.app:5108
...
```

If no subdomain is given in a request,
`www/` will be used as the default subdomain directory
(while no redirect will be done).

Thus the following websites have the same contents:

```
https://fidb.app:5108
https://www.fidb.app:5108
```

## Login a user

Use `POST {data-file}?kind=password-login` HTTP request to login an initialized user:

```sh
curl -X POST "http://127.0.0.1:5108/users/alice?kind=password-login" --data-binary @-<< END

{
  "password": "alice123"
}

END
```

The response of a `POST {data-file}?kind=password-login` request
is an access token in JSON string format.

```json
"34dbf6a79e7968ffc3cda1b51c3fada9"
```

Which can be used in the `Authorization` header for future requests.

```
Authorization: token 34dbf6a79e7968ffc3cda1b51c3fada9
```

## Register a user

Use `POST {data-file}?kind=password-register` HTTP request to register a new user:

```sh
curl -X POST "http://127.0.0.1:5108/users/carol?kind=password-register" --data-binary @-<< END

{
  "data": {
    "name": "Carol"
  },
  "options": {
    "memo": "password-register example",
    "password": "carol789"
  }
}

END
```

Example response of `POST {data-file}?kind=password-register` request:

```json
{
  "name": "Carol",
  "@path": "users/carol",
  "@revision": "6bbf9a32c4d0f7964d1fee2aa9491523",
  "@createdAt": 1694757904583,
  "@updatedAt": 1694757904583
}
```

### Config logger

We can config logger in `/databases/database.json`:

```json
{
  ...,
  "logger": {
    "name": "pretty-line",
    "disableRequestLogging": true
  }
}
```

The type of logger options are:

```ts
export type LoggerOptions = {
  name: "json" | "silent" | "pretty" | "pretty-line"
  disableRequestLogging?: boolean
}
```

The default logger options are:

```json
{
  "name": "pretty-line",
  "disableRequestLogging": false
}
```

### Get free certificate

You can use `certbot` to get free certificate for your domains.

- [Certbot website](https://certbot.eff.org/instructions)
- [Certbot on archlinux wiki](https://wiki.archlinux.org/title/certbot)

After install `certbot`,
I prefer creating certificate via DNS TXT record,
using the following command:

```sh
sudo certbot certonly --manual --preferred-challenges dns
```

Then you can follow the prompt of `certbot`
to create the certificate files,
during which you will need to add TXT record
to the DNS record of your domain
to accomplish the challenge given by `certbot`.

### Use systemd to start service

Install service:

```
sudo cp <name>.service /etc/systemd/system/
```

Using service:

```
sudo systemctl start <name>.service
sudo systemctl enable <name>.service
sudo systemctl status <name>.service
```

To view log:

```
journalctl -f -u <name>.service
```

Reload systemd config files:

```
systemctl daemon-reload
```

## Development

```sh
npm install           # Install dependencies
npm run build         # Compile `src/` to `lib/`
npm run build:watch   # Watch the compilation
npm run format        # Format the code
npm run test          # Run test
npm run test:watch    # Watch the testing
```

## Contributions

To make a contribution, fork this project and create a pull request.

Please read the [STYLE-GUIDE.md](STYLE-GUIDE.md) before you change the code.

Remember to add yourself to [AUTHORS](AUTHORS).
Your line belongs to you, you can write a little
introduction to yourself but not too long.

## License

    [GPLv3](LICENSE)
