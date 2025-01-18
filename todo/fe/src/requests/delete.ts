// deletes a todo
export async function deleteTodo(id: string) {
  const result = await fetch(`/api/v1/todos/${id}`, {
    method: "DELETE",
  });
  if (!result.ok) {
    throw new Error("Failed to delete todo:" + (await result.text()));
  }
}
