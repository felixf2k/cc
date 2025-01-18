import Express from "express";
import { addTodo, deleteTodo, getTodoList, modifyTodo } from "./todosDataManager";
import { Todo } from "../../../../todo/types/todo";

const todosRouter = Express.Router();

// Get all todos
todosRouter.get("/", (req, res) => {
    let todoList = getTodoList();
    res.status(200).json(todoList);
});

// Create new
todosRouter.post("/", (req, res) => {
    const newTodo: Todo = req.body as Todo;
    const todoWithId: Todo = addTodo(newTodo);
    res.status(200).json(todoWithId);
});

// Modify existing by id
todosRouter.put("/:id", (req, res) => {
    const newTodo: Todo = req.body as Todo;
    modifyTodo(newTodo);
    res.sendStatus(200);
});

// Delete by id
todosRouter.delete("/:id", (req, res) => {
    const id: string = req.params.id;
    const deletedTodo = deleteTodo(id);
    res.status(200).json(deletedTodo);
});

export default todosRouter;