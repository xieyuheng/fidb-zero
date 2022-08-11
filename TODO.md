fidb-api -- one backend for all

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
