import fs from 'fs';
// @ts-ignore
import { Todo } from "../../../../types/todo";
import { v4 as uuidv4 } from 'uuid';

let todoListMap: Map<string, Todo> = new Map<string, Todo>;
let init: boolean = false;
const fileName: string = 'data.json';

export function getTodoList() {
    if (!init) {
        readFromFile();
        init = true;
    }
    return Array.from(todoListMap.values());
}

export function addTodo(data: Todo): Todo {
    if (!init) {
        readFromFile();
        init = true;
    }
    data.id = uuidv4();
    return modifyTodo(data);
}

export function modifyTodo(data: Todo): Todo {
    if (!init) {
        readFromFile();
        init = true;
    }
    todoListMap.set(data.id, data);
    saveToFile();
    return data;
}

export function deleteTodo(id: string) {
    if (!init) {
        readFromFile();
        init = true;
    }

    let deleted = todoListMap.delete(id);
    saveToFile();
    return deleted;
}

function saveToFile() {
    const entriesArray = Array.from(todoListMap.entries());

    fs.writeFileSync(fileName, JSON.stringify(entriesArray, null, 2));
    console.log('Map saved to file.');
}

function readFromFile() {
    const data = fs.readFileSync(fileName, 'utf-8');
    const entriesArray = JSON.parse(data);
    
    todoListMap = new Map<string, Todo>(entriesArray);

    console.log('Map loaded from file:', todoListMap);
}