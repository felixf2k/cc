"use client";
import type { Todo } from "../../../types/todo";

interface Props {
  onChange: (todo: Todo) => void;
}

export default function TODO(props: Todo & Props) {
  function onChange(newTodo: Todo) {
    console.log(newTodo);
    props.onChange(newTodo);
  }

  return (
    <div className="flex flex-col gap-4 p-4 rounded-lg bg-gray-50">
      <div className="flex flex-row items-center gap-2">
        <input
          type="checkbox"
          checked={props.done}
          onChange={() => {
            onChange({ ...props, done: !props.done });
          }}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <input
          type="text"
          value={props.title}
          onChange={(e) => {
            onChange({ ...props, title: e.target.value });
          }}
        />
      </div>
      <textarea
        value={props.description}
        onChange={(e) => {
          onChange({ ...props, description: e.target.value });
        }}
      />
      <input
        type="date"
        value={props.due.toISOString().split("T")[0]}
        onChange={(e) => {
          onChange({ ...props, due: new Date(e.target.value) });
        }}
      />
    </div>
  );
}
