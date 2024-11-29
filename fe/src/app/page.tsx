"use client";

import TODO, { CREATE_ID } from "@/components/TODO";
import { useEffect, useState } from "react";
import type { Todo } from "../../../types/todo";
import { list } from "@/requests/list";

async function fetchTodos(): Promise<Todo[]> {
  const result = await fetch(`${process.env.BACKEND_URL}/todos`, {
    method: "GET",
  });
  if (!result.ok) {
    throw new Error("Failed to fetch todos:" + (await result.text()));
  }
  return result.json();
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(function fetchTodo() {
    list()
      .then((todos) => {
        setTodos(todos);
      })
      .catch((e) => {
        console.error(e);
        alert("Todos konnten nicht geladen werden");
      });
  }, []);

  function invalidate(todo: Todo) {
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

  function remove(id: string) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  return (
    <div className="flex flex-col gap-4 justify-start items-start">
      {todos.map((todo) => (
        <TODO {...todo} key={todo.id} invalidate={invalidate} remove={remove} />
      ))}
      <button
        type="button"
        onClick={() => {
          setTodos([
            ...todos,
            {
              id: CREATE_ID,
              done: false,
              title: "",
              description: "",
              due: new Date(),
            },
          ]);
        }}
      >
        Todo erstellen
      </button>
    </div>
  );
}
