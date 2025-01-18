import {v1} from "uuid"
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./todolist-reducer"
import {TodolistType} from "../App";

let todolistId1: string;
let todolistId2: string;
let startState: TodolistType[] = [];

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "all" },
    ]
});

test("correct todolist should be created", () => {
    const newTitle = "New Todolist";
    const endState = todolistReducer(startState, addTodolistAC({todolistTitle: newTitle}));

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTitle);
});

test("correct todolist should be deleted", () => {
    const endState = todolistReducer(startState, removeTodolistAC({todolistId: todolistId1}));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should change its title", () => {
    const newTitle = "New Todolist";
    const endState = todolistReducer(startState, changeTodolistTitleAC({todolistId: todolistId2, todolistTitle: newTitle}));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTitle);
});

test("correct todolist should change its filter", () => {
    const newFilter = "completed";
    const endState = todolistReducer(startState, changeTodolistFilterAC({todolistId: todolistId2, filter: newFilter}));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});