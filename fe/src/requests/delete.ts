export async function deleteTodo(id: string) {
  const result = await fetch(`${process.env.BACKEND_URL}/todos/${id}`, {
    method: "DELETE",
  });
  if (!result.ok) {
    throw new Error("Failed to delete todo:" + (await result.text()));
  }
}
