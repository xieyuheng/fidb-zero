# database

Database.find -- without index

- Database.all + filter

Database.index

Database.find -- with index

# aim

File system as database and a personal server over it.

- All data are owned by you.
- Can have many frontends.
  - A frontend might be readonly view.
  - A frontend might has UI to update data.
- View data as fects and use relational programming to query it.

# nest array in object

fidb nest array in object

- sometimes it does not make sense to normalize data

- `pomodoro.tasks[].trace[]`

  Maybe we should normalize `tasks`, but definitely not `trace`

```
{
  username: "xieyuheng",
  tasks: [
    {
      id: 2,
      title: "Design Mimor",
      trace: [1659920124149, 1659921632305, 1659954068198],
    },
    {
      id: 0,
      title: "Read HoTT",
      trace: [],
    },
    {
      id: 1,
      title: 'Read "Causality"',
      trace: [],
    },
  ],
}
```
