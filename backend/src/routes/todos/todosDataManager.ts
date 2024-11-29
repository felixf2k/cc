// import fs from 'fs';
// @ts-ignore
import { Todo } from "../../../../types/todo";
import { v4 as uuidv4 } from 'uuid';

const todoListMap: Map<string, Todo> = new Map<string, Todo>;

// const fileName: string = 'data.json';

export function getTodoList() {
    return Array.from(todoListMap.values());
}

export function addTodo(data: Todo): Todo {
    data.id = uuidv4();
    return modifyTodo(data);
}

export function modifyTodo(data: Todo): Todo {
    todoListMap.set(data.id, data);
    return data;
}

export function deleteTodo(id: string) {
    return todoListMap.delete(id);
}

// function saveToFile() {
//     const jsonString = JSON.stringify(todoListMap, null, 2); // Pretty print with 2 spaces
//
//     fs.writeFile(fileName, jsonString, (err) => {
//         if (err) {
//             console.error('Error writing file:', err);
//         } else {
//             console.log('JSON file has been saved.');
//         }
//     });
// }
//
// function readFromFile() {
//     fs.readFile(fileName, 'utf8', (err, data) => {
//         if (err) {
//             console.error('Error writing file:', err);
//             return;
//         }
//         todoListMap = JSON.parse(data);
//         console.log('List loaded from file');
//     });
// }