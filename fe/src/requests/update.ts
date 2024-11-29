import { log } from "console";
import { Todo } from "../../../types/todo";

export async function update(todo: Todo) {
  const result = await fetch(`/api/v1/todos/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  if (!result.ok) {
    throw new Error("Failed to update todo:" + (await result.text()));
  }
}
