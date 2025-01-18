import { Todo } from "../../../todo/types/todo";

// creates a todo
export async function create(todo: Todo): Promise<{ id: string }> {
  const result = await fetch(`/api/v1/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  if (!result.ok) {
    throw new Error("Failed to create todo:" + (await result.text()));
  }
  return (await result.json()) as { id: string };
}
