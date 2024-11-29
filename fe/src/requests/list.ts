import { Todo } from "../../../types/todo";

export async function list() {
  const result = await fetch(`/api/v1/todos`, {
    method: "GET",
  });
  if (!result.ok) {
    throw new Error("Failed to list todos:" + (await result.text()));
  }
  return ((await result.json()) as (Todo & { due: string })[]).map((t) => ({
    ...t,
    due: new Date(t.due),
  })) as Todo[];
}
