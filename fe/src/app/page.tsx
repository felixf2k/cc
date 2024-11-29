"use client";

import TODO from "@/components/TODO";
import { useState } from "react";
import type { Todo } from "../../../types/todo";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: crypto.randomUUID(),
      done: false,
      title: "Buy milk",
      description: "Milk is expensive",
      due: new Date(),
    },
  ]);

  function onChange(todo: Todo) {
    const existingTodoIndex = todos.findIndex((t) => t.id === todo.id);
    if (existingTodoIndex === -1) {
      setTodos([...todos, todo]);
      return;
    }
    todos[existingTodoIndex] = todo;

    todos.splice(existingTodoIndex, 1);
    setTodos([
      ...todos.slice(0, existingTodoIndex),
      todo,
      ...todos.slice(existingTodoIndex + 1),
    ]);
  }

  return (
    <div className="flex flex-col gap-4 justify-start items-start">
      {todos.map((todo) => (
        <TODO {...todo} key={todo.id} onChange={onChange} />
      ))}
      <button
        onClick={() => {
          setTodos([
            ...todos,
            {
              id: "create",
              done: false,
              title: "",
              description: "",
              due: new Date(),
            },
          ]);
        }}
      >
        + Todo hinzufügen
      </button>
    </div>
  );
}
