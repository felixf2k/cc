import { Todo } from "../../../types/todo";

export async function list() {
  const result = await fetch(`${process.env.BACKEND_URL}/todos`, {
    method: "GET",
  });
  if (!result.ok) {
    throw new Error("Failed to list todos:" + (await result.text()));
  }
  return (await result.json()) as Todo[];
}
