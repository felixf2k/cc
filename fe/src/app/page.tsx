"use client";

import TODO, { CREATE_ID } from "@/components/TODO";
import { useEffect, useState } from "react";
import type { Todo } from "../../../types/todo";
import { list } from "@/requests/list";

export default function Home() {
  // todos that are shown
  const [todos, setTodos] = useState<Todo[]>([]);
  // whether the loadings state is displayed until the fetch resolves
  const [loading, setLoading] = useState(true);

  // whether an entry exists that creates a new todo (used for the create button)
  const create = todos.find((t) => t.id === CREATE_ID);
  // todos without the create, to calculate kpis
  const todosWithoutCreate = todos.filter((t) => t.id !== CREATE_ID);
  // the amount of todos for which done is false
  const remaining = todosWithoutCreate.filter((t) => !t.done).length;
  // the amount of todos for which done is true
  const done = todosWithoutCreate.filter((t) => t.done).length;

  // loads the todos when the page renders
  useEffect(function fetchTodo() {
    list()
      .then((todos) => {
        setTodos(todos);
        // unset the loading state so the todos are rendered
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        alert("Todos konnten nicht geladen werden");
        setLoading(false);
      });
  }, []);

  function invalidate(todo: Todo) {
    setTodos((currentTodos) => {
      // index of the todo to be updated, -1 if none exists
      const existingTodoIndex = todos.findIndex((t) => t.id === todo.id);
      if (existingTodoIndex === -1) {
        // append the todo to the end of the list
        return [...currentTodos.filter((t) => t.id !== CREATE_ID), todo];
      }
      // delete the existing todo
      todos.splice(existingTodoIndex, 1);
      const pre = todos.slice(0, existingTodoIndex);
      const post = todos.slice(existingTodoIndex + 1);
      // re-add the updated todo
      return [...pre, todo, ...post];
    });
  }

  // removes a todo from the list
  function remove(id: string) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  return (
    <div className="flex flex-col gap-4 justify-start items-start bg-gray-50 rounded-xl py-8 px-4 overflow-hidden">
      <h1 className="text-xl font-semibold px-4">Simple Todo App 🚀</h1>
      <div className="px-4">
        <p className="flex flex-row items-center gap-1">
          <span className="text-xl font-bold text-red-500">{remaining}</span>
          Übrige
        </p>
        <p className="flex flex-row items-center gap-1">
          <span className="text-xl font-bold text-green-500">{done}</span>
          Erledigte
        </p>
      </div>
      {loading ? (
        <div className="h-72 w-72 bg-gray-100 rounded flex items-center justify-center">
          Todos werden geladen...
        </div>
      ) : (
        <div className="overflow-auto grow">
          <div className="flex flex-col gap-4 p-4">
            {todos.map((todo) => (
              <TODO
                {...todo}
                key={todo.id}
                invalidate={invalidate}
                remove={remove}
              />
            ))}
          </div>
        </div>
      )}
      <div className="px-4">
        {!create && (
          <button
            type="button"
            className="bg-blue-500 text-white rounded px-4 py-2 "
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
            + Todo erstellen
          </button>
        )}
      </div>
    </div>
  );
}
