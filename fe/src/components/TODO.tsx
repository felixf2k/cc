"use client";
import { create } from "@/requests/create";
import type { Todo } from "../../../types/todo";
import { update } from "@/requests/update";
import { useState } from "react";
import { deleteTodo } from "@/requests/delete";
import clsx from "clsx";

export const CREATE_ID = "create";

interface Props {
  invalidate: (todo: Todo) => void;
  remove: (id: string) => void;
}

export default function TODO(props: Todo & Props) {
  const [todo, setTodo] = useState<Todo>(props);
  const [saved, setSaved] = useState(props.id !== CREATE_ID);
  const [loading, setLoading] = useState(false);

  function setTodoState(newTodo: Todo) {
    setTodo(newTodo);
    setSaved(false);
  }

  async function sendRequest(newTodo: Todo) {
    setLoading(true);
    if (newTodo.id === CREATE_ID) {
      try {
        const { id } = await create(newTodo);
        props.invalidate({ ...newTodo, id });
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
    setLoading(false);
    setSaved(true);
  }

  return (
    <div className="flex flex-col gap-4 p-4 rounded-lg bg-gray-100 shadow hover:shadow-lg transition-all">
      <div className="flex flex-row items-center gap-2">
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => {
            setTodoState({ ...todo, done: !todo.done });
          }}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        Erledigt
      </div>
      <div className="flex flex-row items-center gap-2">
        Titel
        <input
          type="text p-2"
          value={todo.title}
          onChange={(e) => {
            setTodoState({ ...todo, title: e.target.value });
          }}
        />
      </div>
      <textarea
        value={todo.description}
        onChange={(e) => {
          setTodoState({ ...todo, description: e.target.value });
        }}
      />
      <input
        type="date"
        value={todo.due.toISOString().split("T")[0]}
        onChange={(e) => {
          setTodoState({ ...props, due: new Date(e.target.value) });
        }}
      />
      <div className="flex flex-row items-center gap-4">
        <button
          onClick={() => {
            sendRequest(todo);
          }}
          className={clsx(
            "px-2 py-1 text-white rounded",
            saved ? "bg-green-500" : "bg-blue-500"
          )}
          disabled={saved}
        >
          {(() => {
            if (loading) {
              return "Wird gespeichert...";
            } else if (saved) {
              return "Gespeichert";
            } else if (props.id === CREATE_ID) {
              return "Erstellen";
            }
            return "Speichern";
          })()}
        </button>
        {props.id !== CREATE_ID && (
          <button
            onClick={async () => {
              if (confirm("Möchtest du das Todo wirklich löschen?")) {
                setLoading(true);
                await deleteTodo(todo.id);
                props.remove(todo.id);
              }
            }}
            className="px-2 py-1 text-white rounded bg-red-500"
          >
            Löschen
          </button>
        )}
      </div>
    </div>
  );
}
