"use client";
import { create } from "@/requests/create";
import type { Todo } from "../../../types/todo";
import { update } from "@/requests/update";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export const CREATE_ID = "create";

interface Props {
  invalidate: (todo: Todo) => void;
  remove: (id: string) => void;
}

export default function TODO(props: Todo & Props) {
  const [todo, setTodo] = useState<Todo>(props);

  async function sendRequest(newTodo: Todo) {
    if (newTodo.id === CREATE_ID) {
      try {
        const { id } = await create(newTodo);
        props.invalidate({ ...newTodo, id });
        props.remove(CREATE_ID);
      } catch (e) {
        console.error(e);
        alert("Todo konnte nicht erstellt werden");
      }
    } else {
      try {
        await update(newTodo);
        props.invalidate(newTodo);
      } catch (e) {
        console.error(e);
        alert("Todo konnte nicht aktualisiert werden");
      }
    }
  }

  return (
    <div className="flex flex-col gap-4 p-4 rounded-lg bg-gray-50">
      <div className="flex flex-row items-center gap-2">
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => {
            setTodo({ ...props, done: !todo.done });
          }}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <input
          type="text"
          value={todo.title}
          onChange={(e) => {
            setTodo({ ...props, title: e.target.value });
          }}
        />
      </div>
      <textarea
        value={todo.description}
        onChange={(e) => {
          setTodo({ ...props, description: e.target.value });
        }}
      />
      <input
        type="date"
        value={todo.due.toISOString().split("T")[0]}
        onChange={(e) => {
          setTodo({ ...props, due: new Date(e.target.value) });
        }}
      />
      <button
        onClick={() => {
          sendRequest(todo);
        }}
      >
        Speichern
      </button>
    </div>
  );
}
