"use client";

import TODO, { CREATE_ID } from "@/components/TODO";
import { useEffect, useState } from "react";
import type { Todo } from "../../../types/todo";
import { list } from "@/requests/list";
import { log } from "console";
import Head from "next/head";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const create = todos.find((t) => t.id === CREATE_ID);

  const todosWithoutCraete = todos.filter((t) => t.id !== CREATE_ID);
  const remaining = todosWithoutCraete.filter((t) => !t.done).length;
  const done = todosWithoutCraete.filter((t) => t.done).length;

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
    setTodos((currentTodos) => {
      const existingTodoIndex = todos.findIndex((t) => t.id === todo.id);
      if (existingTodoIndex === -1) {
        return [...currentTodos.filter((t) => t.id !== CREATE_ID), todo];
      }
      todos.splice(existingTodoIndex, 1);
      const pre = todos.slice(0, existingTodoIndex);
      const post = todos.slice(existingTodoIndex + 1);
      return [...pre, todo, ...post];
    });
  }

  function remove(id: string) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  return (
    <div className="flex flex-col gap-4 justify-start items-start bg-gray-50 rounded-xl py-8 px-4 overflow-hidden">
      <Head>
        <title>Todo app</title>
      </Head>
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
